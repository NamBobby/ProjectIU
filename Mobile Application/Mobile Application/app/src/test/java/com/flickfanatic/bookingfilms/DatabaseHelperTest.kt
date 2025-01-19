package com.flickfanatic.bookingfilms

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.data.model.Invoice
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class DatabaseHelperTest {

    private lateinit var dbHelper: DatabaseHelper
    private lateinit var context: Context

    @Before
    fun setup() {
        context = ApplicationProvider.getApplicationContext()
        dbHelper = DatabaseHelper(context)
        dbHelper.writableDatabase // Ensure the database is created
    }

    @After
    fun teardown() {
        dbHelper.close()
        context.deleteDatabase("movies.db")
    }

    @Test
    fun testInsertAndRetrieveFilm() {
        val film = Film(
            title = "Inception",
            description = "A mind-bending thriller",
            poster = "https://example.com/inception.jpg",
            price = 10.0,
            time = "2h 28m",
            trailer = "https://example.com/trailer",
            imdb = 9,
            year = 2010,
            genre = arrayListOf("Sci-Fi", "Thriller"),
            casts = arrayListOf()
        )
        dbHelper.insertFilm(film)
        val films = dbHelper.getAllFilms()

        assertTrue(films.isNotEmpty())
        assertEquals("Inception", films[0].title)
    }

    @Test
    fun testInsertAndRetrieveInvoice() {
        val invoice = Invoice(
            filmTitle = "Inception",
            showDate = "2024-12-20",
            showTime = "18:00",
            seats = "A1,A2",
            cinemaHall = 1,
            totalPrice = 20.0,
            email = "user@example.com",
            barcode = "12345"
        )
        dbHelper.insertInvoice(invoice)
        val invoices = dbHelper.getAllInvoices("user@example.com")

        assertTrue(invoices.isNotEmpty())
        assertEquals("Inception", invoices[0].filmTitle)
        assertEquals(20.0, invoices[0].totalPrice, 0.0)
    }

    @Test
    fun testInsertAndRetrieveUser() {
        dbHelper.insertUser("testuser", "test@example.com", "password123")
        val user = dbHelper.getUserByEmail("test@example.com")

        assertNotNull(user)
        assertEquals("testuser", user?.username)
        assertEquals("test@example.com", user?.email)
    }

    @Test
    fun testUpdateUserPassword() {
        dbHelper.insertUser("testuser", "test@example.com", "password123")
        dbHelper.updateUserPassword("test@example.com", "newpassword123")
        val user = dbHelper.getUserByEmail("test@example.com")

        assertNotNull(user)
        assertNotEquals("password123", user?.password) // Ensure password is updated
    }

    @Test
    fun testGetUpcomingMovies() {
        val film = Film(
            title = "Avatar",
            description = "Epic sci-fi adventure",
            poster = "https://example.com/avatar.jpg"
        )
        dbHelper.insertUpcomingMovie(film)
        val upcomingMovies = dbHelper.getUpcomingMovies()

        assertTrue(upcomingMovies.isNotEmpty())
        assertEquals("Avatar", upcomingMovies[0].title)
    }
}
