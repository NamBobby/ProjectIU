package com.flickfanatic.bookingfilms

import android.content.Context
import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.lifecycle.Observer
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.viewmodels.MainViewModel
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.*

@RunWith(AndroidJUnit4::class)
class MainViewModelTest {

    @get:Rule
    val instantExecutorRule = InstantTaskExecutorRule()

    private lateinit var context: Context
    private lateinit var mainViewModel: MainViewModel

    @Before
    fun setup() {
        context = ApplicationProvider.getApplicationContext()
        mainViewModel = MainViewModel(context)
    }

    @Test
    fun testLoadFilms() {
        val observer = mock(Observer::class.java) as Observer<List<Film>>
        mainViewModel.films.observeForever(observer)

        mainViewModel.loadFilms()

        verify(observer).onChanged(anyList()) // Ensure films data is loaded
    }

    @Test
    fun testLoadUpcomingMovies() {
        val observer = mock(Observer::class.java) as Observer<List<Film>>
        mainViewModel.upcomingMovies.observeForever(observer)

        mainViewModel.loadUpcomingMovies()

        verify(observer).onChanged(anyList()) // Ensure upcoming movies data is loaded
    }

    @Test
    fun testInsertInitialData() {
        mainViewModel.insertInitialData()

        // Verify initial data is inserted
        val films = mainViewModel.films.value
        assertNotNull(films)
        assertTrue(films?.isNotEmpty() == true)
    }

    @Test
    fun testUpdateUIWithEmail() {
        val observer = mock(Observer::class.java) as Observer<String?>
        mainViewModel.loggedInUserEmail.observeForever(observer)

        mainViewModel.updateUIWithEmail()

        verify(observer).onChanged(anyString()) // Ensure email is updated
    }
}
