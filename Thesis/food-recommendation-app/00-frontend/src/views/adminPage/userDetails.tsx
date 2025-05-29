import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminStackParamList } from '../../navigations/AdminNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { apiClient } from '../../services/api';
import UserDetailsStyle from '../../styles/userDetailsStyle';

type UserDetailsRouteProp = RouteProp<AdminStackParamList, 'UserDetails'>;
type UserDetailsNavigationProp = StackNavigationProp<AdminStackParamList, 'UserDetails'>;

interface UserLog {
  id: number;
  date: string;
  time: string;
  meal_time: string;
  food_type: string;
  recommended_food: string;
  emotion: string;
  rating: number;
}

interface UserDetailData {
  id: number;
  name: string;
  email: string;
  role: string;
  date_of_birth: string;
  status: string;
  created_at?: string;
  logs: UserLog[];
}

const UserDetails: React.FC = () => {
  const route = useRoute<UserDetailsRouteProp>();
  const navigation = useNavigation<UserDetailsNavigationProp>();
  const { userId } = route.params;
  
  const [userData, setUserData] = useState<UserDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<{
    name: string;
    email: string;
    role: string;
    status: string;
  }>({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      
      const response = await apiClient.get(`/api/admin/users/${userId}`);
      
      if (response.data && response.data.status === 'success') {
        setUserData(response.data.user);
        setEditedUser({
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          status: response.data.user.status
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Validate form
      if (!editedUser.name.trim() || !editedUser.email.trim()) {
        Alert.alert('Error', 'Name and email are required.');
        return;
      }
      
      await apiClient.put(`/api/admin/users/${userId}`, editedUser);
      
      // Update local state
      if (userData) {
        setUserData({
          ...userData,
          ...editedUser
        });
      }
      
      setEditMode(false);
      Alert.alert('Success', 'User information updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update user information. Please try again.');
    }
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${userData?.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`/api/admin/users/${userId}`);
              
              Alert.alert('Success', 'User has been deleted.');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user. Please try again.');
            }
          }
        }
      ]
    );
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'happy': return '#5CEA7E'; // Green
      case 'sad': return '#805AE3'; // Purple
      case 'angry': return '#FF5A63'; // Red
      case 'neutral': return '#6EA9F7'; // Blue
      case 'surprise': return '#FFA500'; // Orange
      default: return '#6EA9F7'; // Default blue
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{ color: i < rating ? '#F59E0B' : '#D1D5DB', marginRight: 2 }}>
          ★
        </Text>
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  if (loading) {
    return (
      <View style={UserDetailsStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#E39F0C" />
        <Text style={UserDetailsStyle.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={UserDetailsStyle.errorContainer}>
        <Text style={UserDetailsStyle.errorText}>User not found</Text>
        <TouchableOpacity 
          style={UserDetailsStyle.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={UserDetailsStyle.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={UserDetailsStyle.container}>
      <View style={UserDetailsStyle.header}>
        <TouchableOpacity 
          style={UserDetailsStyle.backIcon}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={UserDetailsStyle.title}>User Details</Text>
        {!editMode ? (
          <TouchableOpacity 
            style={UserDetailsStyle.editIcon}
            onPress={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faEdit} size={20} color="#6EA9F7" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={UserDetailsStyle.saveIcon}
            onPress={handleSaveChanges}
          >
            <FontAwesomeIcon icon={faSave} size={20} color="#10B981" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={UserDetailsStyle.content}>
        <View style={UserDetailsStyle.userInfoSection}>
          <Text style={UserDetailsStyle.sectionTitle}>User Information</Text>
          
          <View style={UserDetailsStyle.infoItem}>
            <Text style={UserDetailsStyle.infoLabel}>Name</Text>
            {editMode ? (
              <TextInput
                style={UserDetailsStyle.editInput}
                value={editedUser.name}
                onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                placeholder="Enter name"
              />
            ) : (
              <Text style={UserDetailsStyle.infoValue}>{userData.name}</Text>
            )}
          </View>
          
          <View style={UserDetailsStyle.infoItem}>
            <Text style={UserDetailsStyle.infoLabel}>Email</Text>
            {editMode ? (
              <TextInput
                style={UserDetailsStyle.editInput}
                value={editedUser.email}
                onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={UserDetailsStyle.infoValue}>{userData.email}</Text>
            )}
          </View>
          
          <View style={UserDetailsStyle.infoItem}>
            <Text style={UserDetailsStyle.infoLabel}>Role</Text>
            {editMode ? (
              <View style={UserDetailsStyle.roleSelector}>
                <TouchableOpacity
                  style={[
                    UserDetailsStyle.roleOption,
                    editedUser.role === 'user' && UserDetailsStyle.roleSelected
                  ]}
                  onPress={() => setEditedUser({ ...editedUser, role: 'user' })}
                >
                  <Text
                    style={[
                      UserDetailsStyle.roleOptionText,
                      editedUser.role === 'user' && UserDetailsStyle.roleTextSelected
                    ]}
                  >
                    User
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    UserDetailsStyle.roleOption,
                    editedUser.role === 'admin' && UserDetailsStyle.roleSelected
                  ]}
                  onPress={() => setEditedUser({ ...editedUser, role: 'admin' })}
                >
                  <Text
                    style={[
                      UserDetailsStyle.roleOptionText,
                      editedUser.role === 'admin' && UserDetailsStyle.roleTextSelected
                    ]}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={UserDetailsStyle.infoValue}>{userData.role}</Text>
            )}
          </View>
          
          <View style={UserDetailsStyle.infoItem}>
            <Text style={UserDetailsStyle.infoLabel}>Date of Birth</Text>
            <Text style={UserDetailsStyle.infoValue}>{userData.date_of_birth}</Text>
          </View>
          
          <View style={UserDetailsStyle.infoItem}>
            <View style={UserDetailsStyle.toggleContainer}>
              <Text style={UserDetailsStyle.infoLabel}>Status</Text>
              {editMode ? (
                <Switch
                  value={editedUser.status === 'active'}
                  onValueChange={(value) =>
                    setEditedUser({
                      ...editedUser,
                      status: value ? 'active' : 'inactive'
                    })
                  }
                  trackColor={{ false: '#E5E7EB', true: '#6EA9F7' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <Text
                  style={[
                    UserDetailsStyle.infoValue,
                    {
                      color:
                        userData.status === 'active' ? '#10B981' : '#EF4444'
                    }
                  ]}
                >
                  {userData.status}
                </Text>
              )}
            </View>
          </View>
          
          {userData.created_at && (
            <View style={UserDetailsStyle.infoItem}>
              <Text style={UserDetailsStyle.infoLabel}>Joined</Text>
              <Text style={UserDetailsStyle.infoValue}>{userData.created_at}</Text>
            </View>
          )}
        </View>
        
        {!editMode && (
          <View style={UserDetailsStyle.actionsSection}>
            <Text style={UserDetailsStyle.sectionTitle}>Actions</Text>
            
            <TouchableOpacity
              style={UserDetailsStyle.actionButton}
              onPress={() => setEditMode(true)}
            >
              <FontAwesomeIcon icon={faEdit} size={20} color="#6EA9F7" />
              <Text style={UserDetailsStyle.actionText}>Edit User</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={UserDetailsStyle.actionButton}
              onPress={handleDeleteUser}
            >
              <FontAwesomeIcon icon={faTrash} size={20} color="#EF4444" />
              <Text style={[UserDetailsStyle.actionText, UserDetailsStyle.dangerText]}>
                Delete User
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {userData.logs && userData.logs.length > 0 && (
          <View style={UserDetailsStyle.logSection}>
            <Text style={UserDetailsStyle.sectionTitle}>Food Recommendation History</Text>
            
            {userData.logs.map((log) => (
              <View key={log.id} style={UserDetailsStyle.logItem}>
                <View style={UserDetailsStyle.logHeader}>
                  <Text style={UserDetailsStyle.logDate}>
                    {log.date} • {log.time}
                  </Text>
                  <View
                    style={[
                      UserDetailsStyle.emotionBadge,
                      { backgroundColor: getEmotionColor(log.emotion) }
                    ]}
                  >
                    <Text style={UserDetailsStyle.emotionText}>
                      {log.emotion.charAt(0).toUpperCase() + log.emotion.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <Text style={UserDetailsStyle.logFood}>{log.recommended_food}</Text>
                
                <View style={UserDetailsStyle.logMeta}>
                  <Text style={UserDetailsStyle.logDetails}>
                    {log.meal_time} • {log.food_type}
                  </Text>
                  {renderStars(log.rating)}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;