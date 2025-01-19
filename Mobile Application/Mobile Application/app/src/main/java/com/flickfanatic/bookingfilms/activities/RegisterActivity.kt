package com.flickfanatic.bookingfilms.activities

import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Patterns
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.databinding.ActivityRegisterBinding
import com.flickfanatic.bookingfilms.viewmodels.RegisterViewModel
import com.flickfanatic.bookingfilms.viewmodels.RegisterViewModelFactory

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private val registerViewModel: RegisterViewModel by viewModels { RegisterViewModelFactory(this) }

    public override fun onStart() {
        super.onStart()
        val sharedPreferences = getSharedPreferences("user_pref", MODE_PRIVATE)
        val loggedInUserEmail = sharedPreferences.getString("logged_in_email", null)

        if (loggedInUserEmail != null) {
            navigateToMain()
        }
    }

    @Suppress("DEPRECATION")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)


        binding.loginNow.setOnClickListener {
            val intent = Intent(applicationContext, LoginActivity::class.java)
            val options = ActivityOptions.makeCustomAnimation(
                this,
                R.anim.slide_in_right,
                R.anim.slide_out_left
            )
            startActivity(intent, options.toBundle())
            finish()
        }

        binding.btnRegister.setOnClickListener {
            val username = binding.username.text.toString().trim()
            val email = binding.email.text.toString().trim()
            val password = binding.password.text.toString().trim()
            val confirmPassword = binding.confirmPassword.text.toString().trim()

            if (validateInputs(username, email, password, confirmPassword)) {
                registerUser(username, email, password)
            }
        }
    }

    private fun validateInputs(username: String, email: String, password: String, confirmPassword: String): Boolean {
        if (TextUtils.isEmpty(username)) {
            showToast("Enter username")
            return false
        }

        if (TextUtils.isEmpty(email)) {
            showToast("Enter email")
            return false
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            showToast("Enter a valid email")
            return false
        }

        if (TextUtils.isEmpty(password)) {
            showToast("Enter password")
            return false
        }

        if (TextUtils.isEmpty(confirmPassword)) {
            showToast("Confirm your password")
            return false
        }

        if (password != confirmPassword) {
            showToast("Passwords do not match")
            return false
        }

        return true
    }

    private fun registerUser(username: String, email: String, password: String) {
        binding.progressBar.visibility = View.VISIBLE

        registerViewModel.register(username, email, password).observe(this) { success ->
            binding.progressBar.visibility = View.GONE
            if (success) {
                showToast("Account created successfully")
                navigateToLogin()
            } else {
                showToast("User already exists")
            }
        }
    }

    private fun navigateToMain() {
        val intent = Intent(applicationContext, MainActivity::class.java)
        val options = ActivityOptions.makeCustomAnimation(
            this,
            R.anim.slide_in_right,
            R.anim.slide_out_left
        )
        startActivity(intent, options.toBundle())
        finish()
    }

    private fun navigateToLogin() {
        val intent = Intent(applicationContext, LoginActivity::class.java)
        val options = ActivityOptions.makeCustomAnimation(
            this,
            R.anim.slide_in_right,
            R.anim.slide_out_left
        )
        startActivity(intent, options.toBundle())
        finish()
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
