package com.flickfanatic.bookingfilms.viewmodels

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.data.model.User
import com.flickfanatic.bookingfilms.repositories.MainRepository
import kotlinx.coroutines.launch

class MainViewModel(context: Context) : ViewModel() {
    private val mainRepository = MainRepository(context)

    private val _loggedInUserEmail = MutableLiveData<String?>()
    val loggedInUserEmail: LiveData<String?> get() = _loggedInUserEmail

    private val _films = MutableLiveData<List<Film>>()
    val films: LiveData<List<Film>> get() = _films

    private val _topMovies = MutableLiveData<List<Film>>()
    val topMovies: LiveData<List<Film>> get() = _topMovies

    private val _upcomingMovies = MutableLiveData<List<Film>>()
    val upcomingMovies: LiveData<List<Film>> get() = _upcomingMovies

    fun updateUIWithEmail() {
        val sharedPreferences = mainRepository.context.getSharedPreferences("user_pref", Context.MODE_PRIVATE)
        val email = sharedPreferences.getString("logged_in_email", null)
        _loggedInUserEmail.postValue(email)
    }

    fun getUserByEmail(email: String): User? {
        return mainRepository.getUserByEmail(email)
    }

    fun insertInitialData() {
        mainRepository.insertUpcomingMovies()
        mainRepository.insertFilms()
    }

    fun loadFilms() {
        viewModelScope.launch {
            val films = mainRepository.getAllFilms()
            _films.postValue(films)
        }
    }

    fun handleDatabase() {
        viewModelScope.launch {
            mainRepository.handleDatabase()
        }
    }

    fun loadUpcomingMovies() {
        viewModelScope.launch {
            val upcomingMovies = mainRepository.getUpcomingMovies()
            _upcomingMovies.postValue(upcomingMovies)
        }
    }

    fun closeDatabase() {
        mainRepository.closeDatabase()
    }
}
