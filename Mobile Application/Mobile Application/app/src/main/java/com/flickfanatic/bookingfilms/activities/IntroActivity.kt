package com.flickfanatic.bookingfilms.activities

import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.databinding.ActivityIntroBinding
import com.flickfanatic.bookingfilms.repositories.MainRepository

class IntroActivity : AppCompatActivity() {
    private lateinit var binding: ActivityIntroBinding
    private lateinit var mainRepository: MainRepository

    @Suppress("DEPRECATION")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityIntroBinding.inflate(layoutInflater)
        setContentView(binding.root)
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
        mainRepository = MainRepository(this)
        addDataFromCode()

        binding.startBtn.setOnClickListener {
            val sharedPreferences = getSharedPreferences("user_pref", MODE_PRIVATE)
            sharedPreferences.edit().clear().apply()
            val intent = Intent(this, LoginActivity::class.java)
            val options = ActivityOptions.makeCustomAnimation(
                this,
                R.anim.slide_in_right,
                R.anim.slide_out_left
            )
            startActivity(intent, options.toBundle())
            finish()
        }

        window.setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        )
    }

    private fun addDataFromCode() {
        mainRepository.insertInitialData()
    }
}
