package com.flickfanatic.bookingfilms.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.flickfanatic.bookingfilms.data.model.Cast
import com.flickfanatic.bookingfilms.databinding.ViewholderCastBinding

class CastListAdapter(private val cast: ArrayList<Cast>) :
    RecyclerView.Adapter<CastListAdapter.ViewHolder>() {

    inner class ViewHolder(private val binding: ViewholderCastBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(cast: Cast) {
            Glide.with(itemView.context)
            binding.nameTxt.text = cast.actor
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ViewholderCastBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(cast[position])
    }

    override fun getItemCount(): Int {
        return cast.size
    }
}
