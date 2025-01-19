package com.flickfanatic.bookingfilms.viewmodels

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.flickfanatic.bookingfilms.repositories.LoginRepository

class LoginViewModel(context: Context) : ViewModel() {
    private val loginRepository = LoginRepository(context)

    fun login(email: String, password: String): LiveData<Boolean> {
        val result = MutableLiveData<Boolean>()
        result.value = loginRepository.checkUserLogin(email, password)
        return result
    }
}
