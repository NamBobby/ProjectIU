package com.flickfanatic.bookingfilms.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.flickfanatic.bookingfilms.data.model.Invoice
import com.flickfanatic.bookingfilms.databinding.ItemInvoiceBinding

class InvoiceListAdapter(
    private val invoiceList: List<Invoice>,
    private val onItemChecked: (Invoice, Boolean) -> Unit
) : RecyclerView.Adapter<InvoiceListAdapter.InvoiceViewHolder>() {

    private var isEditMode = false

    class InvoiceViewHolder(val binding: ItemInvoiceBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): InvoiceViewHolder {
        val binding = ItemInvoiceBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return InvoiceViewHolder(binding)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: InvoiceViewHolder, position: Int) {
        val invoice = invoiceList[position]
        holder.binding.filmName.text = invoice.filmTitle
        holder.binding.date.text = "Date: ${invoice.showDate}"
        holder.binding.checkBox.setOnCheckedChangeListener(null)
        holder.binding.checkBox.isChecked = invoice.isExpanded
        holder.binding.checkBox.visibility = if (isEditMode) View.VISIBLE else View.GONE

        holder.binding.root.setOnClickListener {
            invoice.isExpanded = !invoice.isExpanded
            notifyItemChanged(position)
        }

        holder.binding.checkBox.setOnCheckedChangeListener { _, isChecked ->
            onItemChecked(invoice, isChecked)
        }

        if (invoice.isExpanded) {
            holder.binding.detailsLayout.visibility = View.VISIBLE
            holder.binding.date.text = "Date: ${invoice.showDate}"
            holder.binding.time.text = "Time: ${invoice.showTime}"
            holder.binding.seats.text = "Seats: ${invoice.seats}"
            holder.binding.cinemaId.text = "Cinema Hall: ${invoice.cinemaHall}"
            holder.binding.price.text = "Price:  $${invoice.totalPrice}"
            holder.binding.barcode.text ="Barcode: ${invoice.barcode}"
        } else {
            holder.binding.detailsLayout.visibility = View.GONE
        }
    }

    override fun getItemCount(): Int {
        return invoiceList.size
    }

    fun setEditMode(editMode: Boolean) {
        isEditMode = editMode
        notifyDataSetChanged()
    }
}
