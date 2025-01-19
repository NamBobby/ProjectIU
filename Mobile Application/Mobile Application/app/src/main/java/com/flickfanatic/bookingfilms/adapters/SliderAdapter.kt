package com.flickfanatic.bookingfilms.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.bumptech.glide.request.RequestOptions
import com.flickfanatic.bookingfilms.data.model.SliderItems
import com.flickfanatic.bookingfilms.databinding.ViewholderSliderBinding

class SliderAdapter(
    var sliderItems: MutableList<SliderItems>
) : RecyclerView.Adapter<SliderAdapter.SliderViewHolder>() {

    inner class SliderViewHolder(private val binding: ViewholderSliderBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(sliderItem: SliderItems) {
            val requestOptions = RequestOptions().transform(CenterCrop(), RoundedCorners(60))
            Glide.with(itemView.context)
                .load(sliderItem.imageUrl)
                .apply(requestOptions)
                .into(binding.imageSlide)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SliderViewHolder {
        val binding = ViewholderSliderBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return SliderViewHolder(binding)
    }

    override fun onBindViewHolder(holder: SliderViewHolder, position: Int) {
        holder.bind(sliderItems[position])
    }

    override fun getItemCount(): Int = sliderItems.size

}
