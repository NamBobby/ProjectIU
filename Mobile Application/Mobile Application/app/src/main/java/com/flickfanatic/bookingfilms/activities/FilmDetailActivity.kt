@file:Suppress("DEPRECATION")

package com.flickfanatic.bookingfilms.activities

import android.annotation.SuppressLint
import android.app.ActivityOptions
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.view.ViewOutlineProvider
import android.view.WindowManager
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.GranularRoundedCorners
import com.bumptech.glide.request.RequestOptions
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.adapters.CastListAdapter
import com.flickfanatic.bookingfilms.adapters.CategoryEachFilmAdapter
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.databinding.ActivityFilmDetailBinding
import com.flickfanatic.bookingfilms.viewmodels.FilmDetailViewModel
import com.flickfanatic.bookingfilms.viewmodels.FilmDetailViewModelFactory
import eightbitlab.com.blurview.RenderScriptBlur

class FilmDetailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityFilmDetailBinding
    private val filmDetailViewModel: FilmDetailViewModel by viewModels { FilmDetailViewModelFactory(this) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFilmDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setFullScreenMode()
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
        filmDetailViewModel.film.observe(this) { film ->
            film?.let {
                updateUI(it)
            }
        }

        val item: Film = intent.getParcelableExtra("object")!!
        filmDetailViewModel.setFilm(item)
    }

    private fun setFullScreenMode() {
        window.setFlags(
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        )
    }

    @SuppressLint("SetTextI18n")
    private fun updateUI(item: Film) {
        val requestOptions = RequestOptions().transform(CenterCrop(), GranularRoundedCorners(0f, 0f, 50f, 50f))

        Glide.with(this)
            .load(item.poster)
            .apply(requestOptions)
            .into(binding.filmPic)

        binding.titleTxt.text = item.title
        binding.imdbTxt.text = "IMDB ${item.imdb}"
        binding.movieTimeTxt.text = "${item.year} - ${item.time}"
        binding.movieSummeryTxt.text = item.description

        binding.backBtn.setOnClickListener {
            finish()
        }
        binding.buyTicketBtn.setOnClickListener {
            val intent = Intent(this, SeatListActivity::class.java)
            intent.putExtra("film", item)
            val options = ActivityOptions.makeCustomAnimation(
                this,
                R.anim.slide_in_right,
                R.anim.slide_out_left
            )
            startActivity(intent, options.toBundle())
        }

        binding.trailerLink.setOnClickListener {
            val trailerUrl = item.trailer
            if (trailerUrl != null) {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(trailerUrl))
                val options = ActivityOptions.makeCustomAnimation(
                    this,
                    R.anim.slide_in_right,
                    R.anim.slide_out_left
                )
                startActivity(intent, options.toBundle())
            }
        }

        val radius = 10f
        val decorView = window.decorView
        val rootView = decorView.findViewById<ViewGroup>(android.R.id.content)
        val windowsBackground = decorView.background

        binding.blurView.setupWith(rootView, RenderScriptBlur(this))
            .setFrameClearDrawable(windowsBackground)
            .setBlurRadius(radius)
        binding.blurView.outlineProvider = ViewOutlineProvider.BACKGROUND
        binding.blurView.clipToOutline = true

        item.genre.let {
            binding.genreView.adapter = CategoryEachFilmAdapter(it)
            binding.genreView.layoutManager =
                LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        }

        item.casts.let {
            binding.castListView.layoutManager =
                LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
            binding.castListView.adapter = CastListAdapter(it)
        }
    }
}
