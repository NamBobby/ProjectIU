package com.flickfanatic.bookingfilms

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.lifecycle.Observer
import androidx.test.core.app.ApplicationProvider
import com.flickfanatic.bookingfilms.viewmodels.RegisterViewModel
import org.junit.Assert.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.Mockito.*

class RegisterViewModelTest {

    @get:Rule
    val instantExecutorRule = InstantTaskExecutorRule()

    private lateinit var registerViewModel: RegisterViewModel

    @Before
    fun setup() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        registerViewModel = RegisterViewModel(context)
    }

    @Test
    fun registerNewUser_Success() {
        val observer = mock(Observer::class.java) as Observer<Boolean>
        registerViewModel.register("testuser", "test@example.com", "password123").observeForever(observer)

        verify(observer).onChanged(true)
    }

    @Test
    fun registerExistingUser_Failure() {
        // Simulate a user already exists
        registerViewModel.register("testuser", "existing@example.com", "password123").observeForever { success ->
            assertFalse(success)
        }
    }

    @Test
    fun registerWithInvalidEmail_Failure() {
        val observer = mock(Observer::class.java) as Observer<Boolean>
        registerViewModel.register("testuser", "invalid-email", "password123").observeForever(observer)

        verify(observer).onChanged(false) // Ensure registration fails
    }

    @Test
    fun registerWithEmptyFields_Failure() {
        val observer = mock(Observer::class.java) as Observer<Boolean>
        registerViewModel.register("", "test@example.com", "").observeForever(observer)

        verify(observer).onChanged(false) // Ensure registration fails
    }
}
