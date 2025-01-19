package com.flickfanatic.bookingfilms.viewmodels

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.flickfanatic.bookingfilms.repositories.RegisterRepository

class RegisterViewModel(context: Context) : ViewModel() {
    private val registerRepository = RegisterRepository(context)

    fun register(username: String, email: String, password: String): LiveData<Boolean> {
        val result = MutableLiveData<Boolean>()
        result.value = if (registerRepository.checkUserExists(email)) {
            false
        } else {
            registerRepository.insertUser(username, email, password)
            true
        }
        return result
    }
}
