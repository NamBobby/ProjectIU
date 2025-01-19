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

class RegisterActivityTest {
    @get:Rule
    val activityRule = ActivityTestRule(RegisterActivity::class.java)

    @Test
    fun registerWithValidDetailsShouldShowSuccessMessage() {
        onView(withId(R.id.username)).perform(typeText("testuser"), closeSoftKeyboard())
        onView(withId(R.id.email)).perform(typeText("test@example.com"), closeSoftKeyboard())
        onView(withId(R.id.password)).perform(typeText("password"), closeSoftKeyboard())
        onView(withId(R.id.confirmPassword)).perform(typeText("password"), closeSoftKeyboard())
        onView(withId(R.id.btn_register)).perform(click())
        onView(withText("Account created successfully")).check(matches(isDisplayed()))
    }

    @Test
    fun registerWithExistingEmailShouldShowErrorMessage() {
        onView(withId(R.id.username)).perform(typeText("testuser"), closeSoftKeyboard())
        onView(withId(R.id.email)).perform(typeText("test@example.com"), closeSoftKeyboard())
        onView(withId(R.id.password)).perform(typeText("password"), closeSoftKeyboard())
        onView(withId(R.id.confirmPassword)).perform(typeText("password"), closeSoftKeyboard())
        onView(withId(R.id.btn_register)).perform(click())
        onView(withText("User already exists")).check(matches(isDisplayed()))
    }

    @Test
    fun clickingLoginNowNavigatesToLoginActivity() {
        onView(withId(R.id.loginNow)).perform(click())
        onView(withId(R.id.main)).check(matches(isDisplayed()))
    }
}
