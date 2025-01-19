package com.flickfanatic.bookingfilms.repositories

import android.content.Context
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper

class LoginRepository(context: Context) {
    private val dbHelper = DatabaseHelper(context)

    fun checkUserLogin(email: String, password: String): Boolean {
        return dbHelper.checkUserLogin(email, password)
    }

    fun closeDatabase() {
        dbHelper.close()
    }
}
