package com.flickfanatic.bookingfilms.data.model

data class Seat(
    var status: SeatStatus,
    var name: String,
    var filmTitle: String = "",
    var showDate: String = "",
    var showTime: String = "",
    var isBooked: Boolean = false
) {
    enum class SeatStatus {
        AVAILABLE, SELECTED, UNAVAILABLE
    }
}