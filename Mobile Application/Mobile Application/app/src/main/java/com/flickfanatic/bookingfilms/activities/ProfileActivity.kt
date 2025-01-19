package com.flickfanatic.bookingfilms.activities

import android.annotation.SuppressLint
import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.ismaeldivita.chipnavigation.ChipNavigationBar
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper
import com.flickfanatic.bookingfilms.databinding.ActivityProfileBinding
import org.mindrot.jbcrypt.BCrypt

class ProfileActivity : AppCompatActivity() {
    private lateinit var binding: ActivityProfileBinding
    private lateinit var dbHelper: DatabaseHelper

    @SuppressLint("SetTextI18n")
    @Suppress("DEPRECATION")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

        window.statusBarColor = resources.getColor(R.color.themeMainColor, theme)

        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)

        dbHelper = DatabaseHelper(this)

        val sharedPreferences = getSharedPreferences("user_pref", MODE_PRIVATE)
        val email = sharedPreferences.getString("logged_in_email", null)

        if (email != null) {
            val user = dbHelper.getUserByEmail(email)
            if (user != null) {
                binding.tvEmail.text = "Email: ${user.email}"
                binding.tvUsername.text = "Username: ${user.username}"

                binding.btnChangePassword.setOnClickListener {
                    val oldPassword = binding.etOldPassword.text.toString().trim()
                    val newPassword = binding.etNewPassword.text.toString().trim()
                    val newPasswordConfirm = binding.etNewPasswordConfirm.text.toString().trim()

                    if (validateInputs(oldPassword, newPassword, newPasswordConfirm)) {
                        changePassword(user.email, oldPassword, newPassword)
                    }
                }
            }
        }

        binding.btnLogout.setOnClickListener {
            logout()
        }

        val navBar: ChipNavigationBar = findViewById(R.id.chipNavigationBar)
        navBar.setItemSelected(R.id.nav_profile, true)
        navBar.setOnItemSelectedListener { id ->
            when (id) {
                R.id.nav_home -> {
                    val intent = Intent(this, MainActivity::class.java)
                    val options = ActivityOptions.makeCustomAnimation(
                        this,
                        R.anim.slide_in_right,
                        R.anim.slide_out_left
                    )
                    startActivity(intent, options.toBundle())
                    finish()
                }
                R.id.nav_cart -> {
                    val intent = Intent(this, CartActivity::class.java)
                    val options = ActivityOptions.makeCustomAnimation(
                        this,
                        R.anim.slide_in_right,
                        R.anim.slide_out_left
                    )
                    startActivity(intent, options.toBundle())
                    finish()
                }
                R.id.nav_profile -> {
                    Toast.makeText(this, "You are already in Profile", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun validateInputs(oldPassword: String, newPassword: String, newPasswordConfirm: String): Boolean {
        if (TextUtils.isEmpty(oldPassword) || TextUtils.isEmpty(newPassword) || TextUtils.isEmpty(newPasswordConfirm)) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            return false
        }

        if (newPassword != newPasswordConfirm) {
            Toast.makeText(this, "New passwords do not match", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun changePassword(email: String, oldPassword: String, newPassword: String) {
        val user = dbHelper.getUserByEmail(email)

        if (user != null && BCrypt.checkpw(oldPassword, user.password)) {
            dbHelper.updateUserPassword(email, newPassword)
            Toast.makeText(this, "Password changed successfully", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(this, "Old password is incorrect", Toast.LENGTH_SHORT).show()
        }
    }

    private fun logout() {
        val sharedPreferences = getSharedPreferences("user_pref", MODE_PRIVATE)
        sharedPreferences.edit().clear().apply()
        val intent = Intent(this, IntroActivity::class.java)
        val options = ActivityOptions.makeCustomAnimation(
            this,
            R.anim.slide_in_right,
            R.anim.slide_out_left
        )
        startActivity(intent, options.toBundle())
        finish()
    }
}
