package com.flickfanatic.bookingfilms.adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.databinding.ItemTimeBinding

class TimeAdapter(
    private val timeSlots: List<String>,
    private val clickListener: (String) -> Unit
) : RecyclerView.Adapter<TimeAdapter.TimeViewHolder>() {

    private var selectedPosition = -1
    private var lastSelectedPosition = -1

    inner class TimeViewHolder(private val binding: ItemTimeBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(time: String) {
            binding.TextViewTime.text = time

            Log.d("TimeAdapter", "Binding time: $time")

            // Change background and text color based on selection
            if (selectedPosition == adapterPosition) {
                binding.TextViewTime.setBackgroundResource(R.drawable.orange_bg)
                binding.TextViewTime.setTextColor(
                    ContextCompat.getColor(itemView.context, R.color.black)
                )
            } else {
                binding.TextViewTime.setBackgroundResource(R.drawable.light_black_bg)
                binding.TextViewTime.setTextColor(
                    ContextCompat.getColor(itemView.context, R.color.white)
                )
            }

            binding.root.setOnClickListener {
                val position = adapterPosition
                if (position != RecyclerView.NO_POSITION) {
                    lastSelectedPosition = selectedPosition
                    selectedPosition = position
                    notifyItemChanged(lastSelectedPosition)
                    notifyItemChanged(selectedPosition)
                    clickListener(time)
                }
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TimeViewHolder {
        return TimeViewHolder(
            ItemTimeBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: TimeViewHolder, position: Int) {
        holder.bind(timeSlots[position])
    }

    override fun getItemCount(): Int = timeSlots.size
}
