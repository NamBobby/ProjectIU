@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.action.ViewActions.closeSoftKeyboard
import androidx.test.espresso.action.ViewActions.typeText
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.isDisplayed
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.rule.ActivityTestRule
import com.flickfanatic.bookingfilms.R
import org.junit.Rule
import org.junit.Test

class LoginActivityTest {
    @get:Rule
    val activityRule = ActivityTestRule(LoginActivity::class.java)

    @Test
    fun loginWithValidCredentialsShouldNavigateToMainActivity() {
        onView(withId(R.id.email)).perform(typeText("test@example.com"), closeSoftKeyboard())
        onView(withId(R.id.password)).perform(typeText("password"), closeSoftKeyboard())
        onView(withId(R.id.btn_login)).perform(click())
        onView(withId(R.id.coordinatorLayout)).check(matches(isDisplayed()))
    }

    @Test
    fun loginWithInvalidCredentialsShouldShowErrorMessage() {
        onView(withId(R.id.email)).perform(typeText("wrong@example.com"), closeSoftKeyboard())
        onView(withId(R.id.password)).perform(typeText("wrongpassword"), closeSoftKeyboard())
        onView(withId(R.id.btn_login)).perform(click())
        onView(withText("Authentication failed.")).check(matches(isDisplayed()))
    }

    @Test
    fun clickingRegisterNowNavigatesToRegisterActivity() {
        onView(withId(R.id.registerNow)).perform(click())
        onView(withId(R.id.main)).check(matches(isDisplayed()))
    }
}

