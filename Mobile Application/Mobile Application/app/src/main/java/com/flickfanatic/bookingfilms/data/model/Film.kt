package com.flickfanatic.bookingfilms.data.model

import android.os.Parcel
import android.os.Parcelable

data class Film(
    var title: String? = null,
    var description: String? = null,
    var poster: String? = null,
    var time: String? = null,
    var trailer: String? = null,
    var imdb: Int = 0,
    var year: Int = 0,
    var price: Double = 0.0,
    var genre: ArrayList<String> = ArrayList(),
    var casts: ArrayList<Cast> = ArrayList()
) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readInt(),
        parcel.readInt(),
        parcel.readDouble(),
        parcel.createStringArrayList() ?: ArrayList(),
        parcel.createTypedArrayList(Cast.CREATOR) ?: ArrayList()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(title)
        parcel.writeString(description)
        parcel.writeString(poster)
        parcel.writeString(time)
        parcel.writeString(trailer)
        parcel.writeInt(imdb)
        parcel.writeInt(year)
        parcel.writeDouble(price)
        parcel.writeStringList(genre)
        parcel.writeTypedList(casts)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Film> {
        override fun createFromParcel(parcel: Parcel): Film {
            return Film(parcel)
        }

        override fun newArray(size: Int): Array<Film?> {
            return arrayOfNulls(size)
        }
    }
}
