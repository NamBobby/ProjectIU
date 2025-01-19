@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.isDisplayed
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.rule.ActivityTestRule
import com.flickfanatic.bookingfilms.R
import org.junit.Rule
import org.junit.Test

class FilmDetailActivityTest {

    @get:Rule
    val activityRule = ActivityTestRule(FilmDetailActivity::class.java)

    @Test
    fun testFilmDetailsDisplayedCorrectly() {
        onView(withId(R.id.titleTxt)).check(matches(isDisplayed()))
        onView(withId(R.id.imdbTxt)).check(matches(isDisplayed()))
        onView(withId(R.id.movieTimeTxt)).check(matches(isDisplayed()))
        onView(withId(R.id.movieSummeryTxt)).check(matches(isDisplayed()))
    }

    @Test
    fun testTrailerLinkNavigatesToBrowser() {
        onView(withId(R.id.trailerLink)).check(matches(isDisplayed()))
        onView(withId(R.id.trailerLink)).perform(click())
        // Additional tools needed to verify external intents.
    }

    @Test
    fun testBuyTicketButtonNavigatesToSeatSelection() {
        onView(withId(R.id.buyTicketBtn)).perform(click())
        onView(withId(R.id.main)).check(matches(isDisplayed())) // Assuming SeatListActivity's root view has id 'main'
    }

    @Test
    fun testBackButtonNavigatesBack() {
        onView(withId(R.id.backBtn)).perform(click())
        // Assert activity finishes or previous screen is displayed
    }
}
