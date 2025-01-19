package com.flickfanatic.bookingfilms.activities

import android.annotation.SuppressLint
import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.lifecycle.lifecycleScope
import com.ismaeldivita.chipnavigation.ChipNavigationBar
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.adapters.FilmListAdapter
import com.flickfanatic.bookingfilms.adapters.SliderAdapter
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.databinding.ActivityMainBinding
import com.flickfanatic.bookingfilms.dialogs.AllFilmsDialog
import com.flickfanatic.bookingfilms.viewmodels.MainViewModel
import com.flickfanatic.bookingfilms.viewmodels.MainViewModelFactory
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val mainViewModel: MainViewModel by viewModels { MainViewModelFactory(this) }
    private lateinit var filmListAdapter: FilmListAdapter
    private lateinit var sliderAdapter: SliderAdapter
    private lateinit var upcomingFilmListAdapter: FilmListAdapter

    override fun onStart() {
        super.onStart()
        mainViewModel.updateUIWithEmail()
    }

    @SuppressLint("SetTextI18n")
    @Suppress("DEPRECATION")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainViewModel.handleDatabase()
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        window.statusBarColor = resources.getColor(R.color.themeMainColor, theme)

        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)

        val navBar: ChipNavigationBar = findViewById(R.id.chipNavigationBar)
        navBar.setItemSelected(R.id.nav_home, true)
        navBar.setOnItemSelectedListener { id ->
            when (id) {
                R.id.nav_home -> {
                    Toast.makeText(this, "You are already in Home", Toast.LENGTH_SHORT).show()
                }
                R.id.nav_cart -> {
                    val intent = Intent(this, CartActivity::class.java)
                    val options = ActivityOptions.makeCustomAnimation(
                        this,
                        R.anim.slide_in_right,
                        R.anim.slide_out_left
                    )
                    startActivity(intent, options.toBundle())
                }
                R.id.nav_profile -> {
                    val intent = Intent(this, ProfileActivity::class.java)
                    val options = ActivityOptions.makeCustomAnimation(
                        this,
                        R.anim.slide_in_right,
                        R.anim.slide_out_left
                    )
                    startActivity(intent, options.toBundle())
                }
            }
        }

        mainViewModel.loggedInUserEmail.observe(this) { email ->
            if (email != null) {
                lifecycleScope.launch {
                    val user = mainViewModel.getUserByEmail(email)
                    binding.textView3.text = "Hello ${user?.username ?: "User"}"
                }
            } else {
                navigateToIntro()
            }
        }

        mainViewModel.insertInitialData()

        setupRecyclerView()
        setupUpcomingRecyclerView()
        observeViewModel()
        loadFilms()
        loadUpcomingMovies()
    }

    private fun setupRecyclerView() {
        filmListAdapter = FilmListAdapter()
        binding.recyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.recyclerView.adapter = filmListAdapter
    }

    private fun setupUpcomingRecyclerView() {
        upcomingFilmListAdapter = FilmListAdapter(disableClick = true)
        binding.recyclerViewUpcoming.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.recyclerViewUpcoming.adapter = upcomingFilmListAdapter
        upcomingFilmListAdapter.setOnItemClickListener(null)
    }

    private fun observeViewModel() {
        mainViewModel.films.observe(this) { films ->
            if (films != null && films.isNotEmpty()) {
                Log.d("MainActivity", "Films loaded: ${films.size}")

                val topMovies =
                    films.filter { it.title in listOf("Mufasa: The Lion King", "Transformers One", "Wicked", "Spirited Away", "404 Sukeenirun... Run Run") }
                val limitedFilms = topMovies
                filmListAdapter.submitList(limitedFilms)

                binding.progressBarSlider.visibility = View.GONE
            } else {
                binding.progressBarSlider.visibility = View.VISIBLE
                Log.d("MainActivity", "Films list is empty or null")
            }
        }

        mainViewModel.topMovies.observe(this) { topMovies ->
            Log.d("MainActivity", "Top Movies loaded: ${topMovies.size}")
        }

        mainViewModel.upcomingMovies.observe(this) { upcomingMovies ->
            if (upcomingMovies != null && upcomingMovies.isNotEmpty()) {
                Log.d("MainActivity", "Upcoming Movies loaded: ${upcomingMovies.size}")
                upcomingFilmListAdapter.submitList(upcomingMovies)
            } else {
                Log.d("MainActivity", "No Upcoming Movies available")
            }
        }

        binding.textView6.setOnClickListener {
            showAllFilmsDialog(mainViewModel.films.value ?: emptyList())
        }
    }

    private fun showAllFilmsDialog(films: List<Film>) {
        val allFilmsDialog = AllFilmsDialog(this, films)
        allFilmsDialog.show()
    }

    private fun loadFilms() {
        mainViewModel.loadFilms()
    }

    private fun loadUpcomingMovies() {
        mainViewModel.loadUpcomingMovies()
    }

    private fun navigateToIntro() {
        val intent = Intent(applicationContext, IntroActivity::class.java)
        val options = ActivityOptions.makeCustomAnimation(
            this,
            R.anim.slide_in_right,
            R.anim.slide_out_left
        )
        startActivity(intent, options.toBundle())
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        mainViewModel.closeDatabase()
    }
}
