package com.flickfanatic.bookingfilms.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class FilmDetailViewModelFactory(private val context: Context) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(FilmDetailViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return FilmDetailViewModel(context) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
