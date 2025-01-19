@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.rule.ActivityTestRule
import com.flickfanatic.bookingfilms.R
import org.junit.Rule
import org.junit.Test

class SeatListActivityTest {

    @get:Rule
    val activityRule = ActivityTestRule(SeatListActivity::class.java)

    @Test
    fun testDateRecyclerViewDisplaysDates() {
        onView(withId(R.id.dateRecyclerview)).check(matches(isDisplayed()))
        // Perform scrolling or clicks if needed
    }

    @Test
    fun testTimeRecyclerViewDisplaysAfterDateSelection() {
        onView(withId(R.id.dateRecyclerview)).perform(click())
        onView(withId(R.id.TimeRecyclerview)).check(matches(isDisplayed()))
    }

    @Test
    fun testSeatRecyclerViewDisplaysAfterTimeSelection() {
        onView(withId(R.id.dateRecyclerview)).perform(click())
        onView(withId(R.id.TimeRecyclerview)).perform(click())
        onView(withId(R.id.seatRecyclerview)).check(matches(isDisplayed()))
    }

    @Test
    fun testSelectedSeatsUpdatePrice() {
        onView(withId(R.id.dateRecyclerview)).perform(click())
        onView(withId(R.id.TimeRecyclerview)).perform(click())
        onView(withId(R.id.seatRecyclerview)).perform(click()) // Select a seat
        onView(withId(R.id.priceTxt)).check(matches(withText("$24.00"))) // Example price validation
    }

    @Test
    fun testProceedButtonNavigatesToSummary() {
        onView(withId(R.id.button)).perform(click())
        onView(withId(R.id.main)).check(matches(isDisplayed())) // Assuming TicketSummaryActivity's root view has id 'main'
    }
}
