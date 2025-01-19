package com.flickfanatic.bookingfilms.adapters

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.bumptech.glide.request.RequestOptions
import com.flickfanatic.bookingfilms.activities.FilmDetailActivity
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.databinding.ViewholderFilmBinding

class FilmListAdapter(private val disableClick: Boolean = false) : RecyclerView.Adapter<FilmListAdapter.ViewHolder>() {

    private val films = mutableListOf<Film>()

    private var onItemClick: ((Film) -> Unit)? = null

    fun setOnItemClickListener(onItemClick: ((Film) -> Unit)?) {
        this.onItemClick = onItemClick
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ViewholderFilmBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val film = films[position]
        holder.bind(film)
    }

    override fun getItemCount(): Int {
        return films.size
    }

    @SuppressLint("NotifyDataSetChanged")
    fun submitList(films: List<Film>) {
        this.films.clear()
        this.films.addAll(films)
        notifyDataSetChanged()
    }

    inner class ViewHolder(private val binding: ViewholderFilmBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(film: Film) {
            binding.nameTxt.text = film.title
            val requestOptions = RequestOptions()
                .transform(CenterCrop(), RoundedCorners(30))

            Glide.with(itemView.context)
                .load(film.poster)
                .apply(requestOptions)
                .into(binding.pic)

            if (!disableClick) {
                binding.root.setOnClickListener {
                    val intent = Intent(itemView.context, FilmDetailActivity::class.java)
                    intent.putExtra("object", film)
                    itemView.context.startActivity(intent)
                }
            } else {
                binding.root.setOnClickListener(null)
            }
        }
    }
}
