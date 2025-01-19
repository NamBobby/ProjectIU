@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.espresso.action.ViewActions.*
import androidx.test.rule.ActivityTestRule
import com.flickfanatic.bookingfilms.R
import org.junit.Rule
import org.junit.Test

class MainActivityTest {

    @get:Rule
    val activityRule = ActivityTestRule(MainActivity::class.java)

    @Test
    fun testTopMoviesSectionDisplaysCorrectly() {
        onView(withId(R.id.recyclerView)).check(matches(isDisplayed()))
        onView(withId(R.id.textView5)).check(matches(withText("Top Movies")))
    }

    @Test
    fun testSeeAllButtonNavigatesToAllMoviesDialog() {
        onView(withId(R.id.textView6)).perform(click())
        onView(withText("All Films")).check(matches(isDisplayed())) // Assuming dialog title is "All Films"
    }

    @Test
    fun testNavigationToCartActivity() {
        onView(withId(R.id.chipNavigationBar)).perform(click())
        onView(withId(R.id.nav_cart)).perform(click())
        onView(withText("Movie Tickets Booked")).check(matches(isDisplayed())) // Assuming Cart Activity title
    }

    @Test
    fun testNavigationToProfileActivity() {
        onView(withId(R.id.chipNavigationBar)).perform(click())
        onView(withId(R.id.nav_profile)).perform(click())
        onView(withText("Profile")).check(matches(isDisplayed())) // Assuming Profile Activity title
    }

    @Test
    fun testUserGreetingDisplaysCorrectly() {
        onView(withId(R.id.textView3)).check(matches(withText("Hello User"))) // Adjust text as per actual data
    }

    @Test
    fun testUpcomingMoviesSectionDisplaysCorrectly() {
        onView(withId(R.id.recyclerViewUpcoming)).check(matches(isDisplayed()))
        onView(withId(R.id.textViewUpcoming)).check(matches(withText("Upcoming Movies")))
    }
}
