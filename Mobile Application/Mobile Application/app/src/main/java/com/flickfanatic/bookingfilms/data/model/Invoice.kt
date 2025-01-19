package com.flickfanatic.bookingfilms.data.model

data class Invoice(
    val filmTitle: String,
    val showDate: String,
    val showTime: String,
    val seats: String,
    val cinemaHall: Int,
    val totalPrice: Double,
    val email: String,
    val barcode: String,
    var isExpanded: Boolean = false,
)
