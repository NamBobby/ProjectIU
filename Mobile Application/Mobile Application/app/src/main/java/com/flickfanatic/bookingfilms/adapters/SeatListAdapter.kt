package com.flickfanatic.bookingfilms.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.flickfanatic.bookingfilms.R
import com.flickfanatic.bookingfilms.data.model.Seat
import com.flickfanatic.bookingfilms.databinding.SeatItemBinding

class SeatListAdapter(
    private val seatList: List<Seat>,
    private val selectedSeat: SelectedSeat
) : RecyclerView.Adapter<SeatListAdapter.SeatViewHolder>() {
    private val selectedSeatNames = ArrayList<String>()

    class SeatViewHolder(val binding: SeatItemBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SeatViewHolder {
        return SeatViewHolder(
            SeatItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: SeatViewHolder, position: Int) {
        val seat = seatList[position]
        holder.binding.seat.text = seat.name

        when (seat.status) {
            Seat.SeatStatus.AVAILABLE -> {
                holder.binding.seat.setBackgroundResource(R.drawable.ic_seat_available)
                holder.binding.seat.setTextColor(ContextCompat.getColor(holder.itemView.context, R.color.white))
            }
            Seat.SeatStatus.SELECTED -> {
                holder.binding.seat.setBackgroundResource(R.drawable.ic_seat_selected)
                holder.binding.seat.setTextColor(ContextCompat.getColor(holder.itemView.context, R.color.black))
            }
            Seat.SeatStatus.UNAVAILABLE -> {
                holder.binding.seat.setBackgroundResource(R.drawable.ic_seat_unavailable)
                holder.binding.seat.setTextColor(ContextCompat.getColor(holder.itemView.context, R.color.grey))
            }
        }

        holder.binding.seat.setOnClickListener {
            when (seat.status) {
                Seat.SeatStatus.AVAILABLE -> {
                    seat.status = Seat.SeatStatus.SELECTED
                    selectedSeatNames.add(seat.name)
                    notifyItemChanged(position)
                }
                Seat.SeatStatus.SELECTED -> {
                    seat.status = Seat.SeatStatus.AVAILABLE
                    selectedSeatNames.remove(seat.name)
                    notifyItemChanged(position)
                }
                else -> {}
            }
            val selected = selectedSeatNames.joinToString(",")
            selectedSeat.returnSelected(selected, selectedSeatNames.size)
        }
    }

    override fun getItemCount(): Int = seatList.size

    fun getSelectedSeats(): List<String> {
        return selectedSeatNames
    }

    interface SelectedSeat {
        fun returnSelected(selectedName: String, num: Int)
    }
}
