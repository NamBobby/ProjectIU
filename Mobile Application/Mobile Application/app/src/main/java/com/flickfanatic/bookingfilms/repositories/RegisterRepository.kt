package com.flickfanatic.bookingfilms.repositories

import android.content.Context
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper
import org.mindrot.jbcrypt.BCrypt

class RegisterRepository(context: Context) {
    private val dbHelper = DatabaseHelper(context)

    fun checkUserExists(email: String): Boolean {
        return dbHelper.checkUserExists(email)
    }

    fun insertUser(username: String, email: String, password: String) {
        val hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt())
        dbHelper.insertUser(username, email, hashedPassword)
    }

    fun closeDatabase() {
        dbHelper.close()
    }
}
