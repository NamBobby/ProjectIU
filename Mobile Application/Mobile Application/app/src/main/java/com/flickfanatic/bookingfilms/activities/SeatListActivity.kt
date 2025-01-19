@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import android.annotation.SuppressLint
import android.app.ActivityOptions
import android.content.Intent
import android.icu.text.DecimalFormat
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.adapters.DateAdapter
import com.flickfanatic.bookingfilms.adapters.SeatListAdapter
import com.flickfanatic.bookingfilms.adapters.TimeAdapter
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.data.model.Seat
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper // Đảm bảo bạn đã import DatabaseHelper
import com.flickfanatic.bookingfilms.databinding.ActivitySeatListBinding
import java.time.LocalDate
import java.time.LocalTime
import java.time.Month
import java.time.format.DateTimeFormatter
import java.util.Locale

class SeatListActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySeatListBinding
    private lateinit var film: Film
    private lateinit var dbHelper: DatabaseHelper
    private var price: Double = 0.0
    private var number: Int = 0
    private var selectedDate: LocalDate? = null
    private var selectedTime: LocalTime? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySeatListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        dbHelper = DatabaseHelper(this)
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
        try {
            getIntentExtra()
            setVariable()
            initDateAndTimePickers()
            window.setFlags(
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
            )
        } catch (_: Exception) {}

        binding.button.setOnClickListener {
            val seats = (binding.seatRecyclerview.adapter as SeatListAdapter).getSelectedSeats()
            if (selectedDate != null && selectedTime != null && seats.isNotEmpty()) {
                val email = getEmailFromSharedPreferences()
                val intent = Intent(this, TicketSummaryActivity::class.java).apply {
                    putExtra("filmTitle", film.title)
                    putExtra("showDate", selectedDate.toString())
                    putExtra("showTime", selectedTime.toString())
                    putExtra("seats", seats.joinToString(","))
                    putExtra("cinemaHall", 1)
                    putExtra("totalPrice", price)
                    putExtra("email", email)
                }
                val options = ActivityOptions.makeCustomAnimation(
                    this,
                    R.anim.slide_in_right,
                    R.anim.slide_out_left
                )
                startActivity(intent, options.toBundle())
            }
        }
    }

    private fun getEmailFromSharedPreferences(): String? {
        val sharedPreferences = getSharedPreferences("user_pref", MODE_PRIVATE)
        return sharedPreferences.getString("logged_in_email", null)
    }

    private fun initDateAndTimePickers() {
        val dateFormatter = DateTimeFormatter.ofPattern("EEE/dd/MMM", Locale.ENGLISH)

        binding.dateRecyclerview.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        val dates = generateDates().map { it.format(dateFormatter) }
        binding.dateRecyclerview.adapter = DateAdapter(dates) { dateStr ->
            try {
                val parsedDate = parseDateString(dateStr)
                selectedDate = parsedDate
                updateAvailableTimeSlots(parsedDate)
                binding.TimeRecyclerview.visibility = View.VISIBLE
                binding.seatRecyclerview.visibility = View.GONE
            } catch (_: Exception) {}
        }

        binding.TimeRecyclerview.visibility = View.GONE
        binding.seatRecyclerview.visibility = View.GONE
    }

    private fun parseDateString(dateString: String): LocalDate {
        val parts = dateString.split("/")
        val dayOfMonth = parts[1].toInt()
        val monthAbbreviation = parts[2].toUpperCase(Locale.ENGLISH)

        val month = when (monthAbbreviation) {
            "JAN" -> Month.JANUARY
            "FEB" -> Month.FEBRUARY
            "MAR" -> Month.MARCH
            "APR" -> Month.APRIL
            "MAY" -> Month.MAY
            "JUN" -> Month.JUNE
            "JUL" -> Month.JULY
            "AUG" -> Month.AUGUST
            "SEP" -> Month.SEPTEMBER
            "OCT" -> Month.OCTOBER
            "NOV" -> Month.NOVEMBER
            "DEC" -> Month.DECEMBER
            else -> throw IllegalArgumentException("Invalid month abbreviation: $monthAbbreviation")
        }

        return LocalDate.of(LocalDate.now().year, month, dayOfMonth)
    }

    private fun generateDates(): List<LocalDate> {
        val dates = mutableListOf<LocalDate>()
        val today = LocalDate.now()

        for (i in 0 until 7) {
            dates.add(today.plusDays(i.toLong()))
        }
        return dates
    }

    private fun updateAvailableTimeSlots(date: LocalDate) {
        val timeSlots = generateTimeSlots()
        val currentTime = LocalTime.now()
        val upcomingTimeSlots = mutableListOf<String>()

        if (date.isEqual(LocalDate.now())) {
            for (time in timeSlots) {
                val localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH))
                if (localTime.isAfter(currentTime.minusMinutes(30))) {
                    upcomingTimeSlots.add(time)
                }
            }
        } else {
            upcomingTimeSlots.addAll(timeSlots)
        }

        binding.TimeRecyclerview.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.TimeRecyclerview.adapter = TimeAdapter(upcomingTimeSlots) {
            selectedTime = LocalTime.parse(it, DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH))
            updateSeatsList()
            binding.seatRecyclerview.visibility = View.VISIBLE
        }
    }

    private fun updateSeatsList() {
        val gridLayoutManager = GridLayoutManager(this, 8)
        gridLayoutManager.spanSizeLookup = object : GridLayoutManager.SpanSizeLookup() {
            override fun getSpanSize(position: Int): Int {
                return 1
            }
        }

        binding.seatRecyclerview.layoutManager = gridLayoutManager

        try {
            val seatAdapter = SeatListAdapter(generateSeats(), object : SeatListAdapter.SelectedSeat {
                @SuppressLint("SetTextI18n")
                override fun returnSelected(selectedName: String, num: Int) {
                    binding.numberSelectedTxt.text = "$num Seat Selected"
                    val df = DecimalFormat("#.##")
                    price = df.format(num * film.price).toDouble()
                    number = num
                    binding.priceTxt.text = "$$price"
                }
            })
            binding.seatRecyclerview.adapter = seatAdapter
            binding.seatRecyclerview.isNestedScrollingEnabled = false
        } catch (_: Exception) {}
    }

    private fun setVariable() {
        binding.backBtn.setOnClickListener {
            finish()
        }
    }

    private fun getIntentExtra() {
        film = intent.getParcelableExtra("film")!!
    }

    private fun generateTimeSlots(): List<String> {
        val timeSlots = mutableListOf<String>()
        val start = LocalTime.of(10, 0)
        val end = LocalTime.of(23, 59)
        var time = start

        while (time.isBefore(end) && timeSlots.size < 10) {
            timeSlots.add(time.format(DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH)))
            time = time.plusHours(2)
        }

        return timeSlots
    }

    private fun generateSeats(): List<Seat> {
        val seatList = mutableListOf<Seat>()
        val numberSeats = 96

        if (selectedDate != null && selectedTime != null) {
            val filmTitle = film.title ?: return seatList
            val dateString = selectedDate?.toString() ?: return seatList
            val timeString = selectedTime?.toString() ?: return seatList

            val bookedSeats = dbHelper.getBookedSeats(filmTitle, dateString, timeString)

            Log.d("SeatListActivity", "Booked seats: $bookedSeats")

            for (i in 0 until numberSeats) {
                val row = 'A' + (i / 8)
                val seatName = "$row${i % 8 + 1}"
                val seatStatus = if (bookedSeats.contains(seatName)) {
                    Seat.SeatStatus.UNAVAILABLE
                } else {
                    Seat.SeatStatus.AVAILABLE
                }
                seatList.add(Seat(seatStatus, seatName))
            }
        }
        Log.d("SeatListActivity", "Generated seats: $seatList")
        return seatList
    }
}