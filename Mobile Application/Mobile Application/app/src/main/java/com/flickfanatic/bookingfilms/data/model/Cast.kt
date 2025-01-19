package com.flickfanatic.bookingfilms.data.model

import android.os.Parcel
import android.os.Parcelable

data class Cast(
    var actor:String?=null
):Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString()
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(actor)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Cast> {
        override fun createFromParcel(parcel: Parcel): Cast {
            return Cast(parcel)
        }

        override fun newArray(size: Int): Array<Cast?> {
            return arrayOfNulls(size)
        }
    }
}
