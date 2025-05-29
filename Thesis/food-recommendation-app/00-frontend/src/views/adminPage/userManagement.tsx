// src/views/adminPage/userManagement.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminStackParamList } from '../../navigations/AdminNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faFilter,
  faSort,
  faEdit,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { apiClient } from '../../services/api';
import UserManagementStyle from '../../styles/userManagementStyle';

type UserManagementNavigationProp = StackNavigationProp<AdminStackParamList, 'UserDetails'>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  date_of_birth: string;
  status: string;
  created_at?: string;
}

const UserManagement: React.FC = () => {
  const navigation = useNavigation<UserManagementNavigationProp>();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, roleFilter, statusFilter, users, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const response = await apiClient.get('/api/admin/users');
      
      if (response.data && response.data.status === 'success') {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Apply sorting (by name)
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredUsers(result);
  };

  const handleUserPress = (userId: number) => {
    navigation.navigate('UserDetails', { userId });
  };

  const handleDeleteUser = (user: User) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`/api/admin/users/${user.id}`);
              
              // Remove user from state
              const updatedUsers = users.filter(u => u.id !== user.id);
              setUsers(updatedUsers);
              
              Alert.alert('Success', 'User has been deleted.');
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user. Please try again.');
            }
          }
        }
      ]
    );
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={UserManagementStyle.userItem}>
      <TouchableOpacity 
        style={UserManagementStyle.userInfo}
        onPress={() => handleUserPress(item.id)}
      >
        <Text style={UserManagementStyle.userName}>{item.name}</Text>
        <Text style={UserManagementStyle.userEmail}>{item.email}</Text>
        <View style={UserManagementStyle.userMeta}>
          <View style={[
            UserManagementStyle.roleBadge, 
            {backgroundColor: item.role === 'admin' ? '#F59E0B' : '#6EA9F7'}
          ]}>
            <Text style={UserManagementStyle.roleBadgeText}>{item.role}</Text>
          </View>
          <View style={[
            UserManagementStyle.statusBadge, 
            {backgroundColor: item.status === 'active' ? '#10B981' : '#EF4444'}
          ]}>
            <Text style={UserManagementStyle.statusBadgeText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={UserManagementStyle.userActions}>
        <TouchableOpacity 
          style={[UserManagementStyle.actionButton, UserManagementStyle.editButton]}
          onPress={() => handleUserPress(item.id)}
        >
          <FontAwesomeIcon icon={faEdit} size={16} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[UserManagementStyle.actionButton, UserManagementStyle.deleteButton]}
          onPress={() => handleDeleteUser(item)}
        >
          <FontAwesomeIcon icon={faTrash} size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={UserManagementStyle.modalOverlay}>
        <View style={UserManagementStyle.modalContent}>
          <View style={UserManagementStyle.modalHeader}>
            <Text style={UserManagementStyle.modalTitle}>Filter Users</Text>
            <TouchableOpacity 
              onPress={() => setFilterModalVisible(false)}
              style={UserManagementStyle.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={UserManagementStyle.filterSection}>
            <Text style={UserManagementStyle.filterLabel}>Role</Text>
            <View style={UserManagementStyle.filterOptions}>
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  roleFilter === 'all' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setRoleFilter('all')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  roleFilter === 'all' && UserManagementStyle.filterOptionTextSelected
                ]}>All</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  roleFilter === 'admin' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setRoleFilter('admin')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  roleFilter === 'admin' && UserManagementStyle.filterOptionTextSelected
                ]}>Admin</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  roleFilter === 'user' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setRoleFilter('user')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  roleFilter === 'user' && UserManagementStyle.filterOptionTextSelected
                ]}>User</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={UserManagementStyle.filterSection}>
            <Text style={UserManagementStyle.filterLabel}>Status</Text>
            <View style={UserManagementStyle.filterOptions}>
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  statusFilter === 'all' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setStatusFilter('all')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  statusFilter === 'all' && UserManagementStyle.filterOptionTextSelected
                ]}>All</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  statusFilter === 'active' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setStatusFilter('active')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  statusFilter === 'active' && UserManagementStyle.filterOptionTextSelected
                ]}>Active</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  UserManagementStyle.filterOption,
                  statusFilter === 'inactive' && UserManagementStyle.filterOptionSelected
                ]}
                onPress={() => setStatusFilter('inactive')}
              >
                <Text style={[
                  UserManagementStyle.filterOptionText,
                  statusFilter === 'inactive' && UserManagementStyle.filterOptionTextSelected
                ]}>Inactive</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={UserManagementStyle.applyButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={UserManagementStyle.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={UserManagementStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#E39F0C" />
        <Text style={UserManagementStyle.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={UserManagementStyle.container}>
      <View style={UserManagementStyle.header}>
        <Text style={UserManagementStyle.title}>User Management</Text>
      </View>
      
      <View style={UserManagementStyle.searchContainer}>
        <View style={UserManagementStyle.searchBox}>
          <FontAwesomeIcon icon={faSearch} size={16} color="#6B7280" />
          <TextInput
            style={UserManagementStyle.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={UserManagementStyle.filterActions}>
          <TouchableOpacity 
            style={UserManagementStyle.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <FontAwesomeIcon icon={faFilter} size={16} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={UserManagementStyle.sortButton}
            onPress={toggleSortOrder}
          >
            <FontAwesomeIcon icon={faSort} size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
      
      {filteredUsers.length === 0 ? (
        <View style={UserManagementStyle.emptyContainer}>
          <Text style={UserManagementStyle.emptyText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={UserManagementStyle.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default UserManagement;