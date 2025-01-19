package com.flickfanatic.bookingfilms.activities

import android.annotation.SuppressLint
import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper
import com.flickfanatic.bookingfilms.data.model.Invoice
import com.flickfanatic.bookingfilms.data.model.Seat
import com.flickfanatic.bookingfilms.databinding.ActivityInvoiceBinding

class InvoiceActivity : AppCompatActivity() {
    private lateinit var binding: ActivityInvoiceBinding
    private lateinit var dbHelper: DatabaseHelper

    @Suppress("DEPRECATION")
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInvoiceBinding.inflate(layoutInflater)
        setContentView(binding.root)

        dbHelper = DatabaseHelper(this)

        window.statusBarColor = resources.getColor(R.color.themeMainColor, theme)

        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)

        val filmTitle = intent.getStringExtra("filmTitle")
        val showDate = intent.getStringExtra("showDate")
        val showTime = intent.getStringExtra("showTime")
        val seats = intent.getStringExtra("seats")
        val cinemaHall = intent.getIntExtra("cinemaHall", 1)
        val totalPrice = intent.getDoubleExtra("totalPrice", 0.0)
        val email = intent.getStringExtra("email")
        val barcode = generateRandomBarcode()

        binding.filmName.text = "Film Title: $filmTitle"
        binding.date.text = "Date: $showDate"
        binding.time.text = "Time: $showTime"
        binding.seats.text = "Seats: $seats"
        binding.cinemaId.text = "Cinema Hall: $cinemaHall"
        binding.price.text = "Total Price: $$totalPrice"
        binding.email.text = "Email: $email"
        binding.barcode.text = "Barcode: $barcode"

        binding.buttonConfirm.setOnClickListener {
            val invoice = Invoice(
                filmTitle = filmTitle ?: "",
                showDate = showDate ?: "",
                showTime = showTime ?: "",
                seats = seats ?: "",
                cinemaHall = cinemaHall,
                totalPrice = totalPrice,
                email = email ?: "",
                barcode = barcode
            )
            dbHelper.insertInvoice(invoice)
            Toast.makeText(this, "Invoice saved successfully", Toast.LENGTH_SHORT).show()

            val bookedSeats = seats?.split(",") ?: listOf()
            for (seat in bookedSeats) {
                val seatToInsert = Seat(
                    status = Seat.SeatStatus.UNAVAILABLE,
                    name = seat,
                    filmTitle = filmTitle ?: "",
                    showDate = showDate ?: "",
                    showTime = showTime ?: "",
                    isBooked = true
                )
                dbHelper.insertSeat(seatToInsert)
            }

            val intent = Intent(this, MainActivity::class.java)
            val options = ActivityOptions.makeCustomAnimation(
                this,
                R.anim.slide_in_right,
                R.anim.slide_out_left
            )
            startActivity(intent, options.toBundle())
            finish()
        }
    }

    private fun generateRandomBarcode(): String {
        val chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return (1..10)
            .map { chars.random() }
            .joinToString("")
    }
}
