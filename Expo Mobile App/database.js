// database.js

import * as SQLite from 'expo-sqlite';
import { format, subDays } from 'date-fns';

const db = SQLite.openDatabase('my_database.db'); // Creat a database named 'my_database.db'

// Khởi tạo cơ sở dữ liệu và tạo bảng nếu chưa tồn tại
export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT, email TEXT, password TEXT)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS results (resultId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, userId INTEGER, date TEXT, time TEXT, result TEXT, FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE)'
    );

    // Check if the users table is empty
    tx.executeSql(
      'SELECT COUNT(*) as count FROM users',
      [],
      (_, { rows }) => {
        const { count } = rows.item(0);
    
        // If the users table is empty, insert a default user and their results
        if (count === 0) {
          const userId = generateRandomUserId(); // Specify the desired userId here
    
          // Insert default user
          tx.executeSql(
            'INSERT INTO users (userId, name, email, password) VALUES (?, ?, ?, ?)',
            [userId, 'Tien Nguyen', 'tiennguyen@gmail.com', '12345'],
            (_, { insertId }) => {
              console.log('Default user inserted with ID:', insertId);
    
              // Insert default results for the user
              const currentDate = new Date();
              for (let i = 0; i < 5; i++) {
                const date = subDays(currentDate, i);
                const formattedDate = format(date, 'yyyy-MM-dd'); // Định dạng ngày thành 'YYYY-MM-DD'
                const time = format(date, 'HH:mm:ss'); // Định dạng giờ thành 'HH:MM:SS'
                const result = `level_${i % 4}`; // Alternate between "level_0", "level_1", "level_2", "level_3"
    
                tx.executeSql(
                  'INSERT INTO results (userId, date, time, result) VALUES (?, ?, ?, ?)',
                  [userId, formattedDate, time, result],
                  (_, { insertId }) => {
                    console.log('Default result inserted with ID:', insertId);
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};



// Thêm người dùng mới vào cơ sở dữ liệu
export const addUser = (name, email, password) => {
  const userId = generateRandomUserId(); // Tạo userId ngẫu nhiên có 8 chữ số
  
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (userId, name, email, password) VALUES (?, ?, ?, ?)',
        [userId, name, email, password],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log('User inserted with ID:', insertId);
            resolve(insertId);
          } else {
            reject(new Error('Failed to insert user'));
          }
        }
      );
    });
  });
};

// Hàm tạo userId ngẫu nhiên có 8 chữ số
const generateRandomUserId = () => {
  const min = 10000000; // Số nhỏ nhất có 8 chữ số
  const max = 99999999; // Số lớn nhất có 8 chữ số
  return Math.floor(Math.random() * (max - min + 1)) + min;
};



// Tìm người dùng bằng email
export const getUserByEmail = async (email) => {
  try {
    const db = SQLite.openDatabase('my_database.db');
    const query = `SELECT * FROM users WHERE email = ?`;
    const params = [email];
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, { rows }) => {
            if (rows.length > 0) {
              const user = rows.item(0);
              resolve(user);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Lỗi khi tìm người dùng:', error);
    throw error;
  }
};




// Lưu kết quả đo được từ người dùng
export const saveResult = async (userId, date, time, result) => {
  try {
    const existingResult = await getResultByDate(userId, date);
    if (existingResult) {
      // Nếu đã tồn tại kết quả trong ngày và tháng trùng lặp, cập nhật kết quả mới
      await updateResult(existingResult.resultId, result);
      console.log('Result updated successfully!');
    } else {
      // Nếu không có kết quả trong ngày và tháng trùng lặp, tạo một kết quả mới
      await createResult(userId, date, time, result);
      console.log('Result created successfully!');
    }
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
};

// Kiểm tra sự tồn tại của kết quả trong ngày và tháng trùng lặp
export const getResultByDate = async (userId, date) => {
  try {
    const query = `
      SELECT *
      FROM results
      WHERE userId = ? AND date = ?
    `;
    const params = [userId, date];
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => {
            const rows = resultSet.rows._array;
            if (rows.length > 0) {
              const result = rows[0];
              resolve(result);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error checking result:', error);
    throw error;
  }
};

// Cập nhật kết quả
export const updateResult = async (resultId, result) => {
  try {
    const query = `
      UPDATE results
      SET result = ?
      WHERE resultId = ?
    `;
    const params = [result, resultId];
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => {
            resolve(resultSet);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error updating result:', error);
    throw error;
  }
};

export const createResult = async (userId, date, time, result) => {
  const resultId = generateRandomResultId(); // Tạo resultId ngẫu nhiên

  try {
    const query = `
      INSERT INTO results (resultId, userId, date, time, result)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [resultId, userId, date, time, result];

    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => {
            resolve(resultSet.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error creating result:', error);
    throw error;
  }
};

// Function để tạo resultId ngẫu nhiên gồm 8 chữ số
const generateRandomResultId = () => {
  const min = 10000000; // Số 8 chữ số nhỏ nhất
  const max = 99999999; // Số 8 chữ số lớn nhất
  return Math.floor(Math.random() * (max - min + 1)) + min;
};



// Kiểm tra người dùng bằng email và mật khẩu
export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const db = SQLite.openDatabase('my_database.db');
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const params = [email, password];
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => {
            const rows = resultSet.rows._array; // Truy xuất đúng dữ liệu từ ResultSet
            if (rows.length > 0) {
              const user = rows[0];
              resolve(user);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Lỗi khi kiểm tra người dùng:', error);
    throw error;
  }
};

export const getResults = async (email) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const currentDate = new Date();
        const sevenDaysAgo = subDays(currentDate, 5);
        const query = `
          SELECT *
          FROM results
          WHERE userId = (SELECT userId FROM users WHERE email = ?)
            AND date BETWEEN ? AND ?
          ORDER BY date DESC
        `;
        const params = [email, sevenDaysAgo.toISOString(), currentDate.toISOString()];
        tx.executeSql(
          query,
          params,
          (_, { rows }) => {
            const results = [];
            for (let i = 0; i < rows.length; i++) {
              const result = rows.item(i);
              if (result) {
                results.push(result);
              }
            }
            resolve(results);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Lỗi khi lấy kết quả:', error);
    throw error;
  }
};


// Xoá tất cả dữ liệu trong cơ sở dữ liệu
export const deleteAllData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS users',
      [],
      (_, result) => {
        console.log('Deleted users table');
      },
      (_, error) => {
        console.log('Error deleting users table:', error);
      }
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS results',
      [],
      (_, result) => {
        console.log('Deleted results table');
      },
      (_, error) => {
        console.log('Error deleting results table:', error);
      }
    );
  });
};

