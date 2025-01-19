package com.flickfanatic.bookingfilms.repositories

import android.content.Context
import com.flickfanatic.bookingfilms.data.local.DatabaseHelper
import com.flickfanatic.bookingfilms.data.model.Cast
import com.flickfanatic.bookingfilms.data.model.Film
import com.flickfanatic.bookingfilms.data.model.User

class MainRepository(val context: Context) {
    private val dbHelper = DatabaseHelper(context)
    private val resetDatabase = false

    fun handleDatabase() {
        if (resetDatabase) {
            dbHelper.resetDatabase()
            insertInitialData()
        }
    }

    fun insertInitialData() {
        insertFilms()
        insertUpcomingMovies()
    }

    fun insertFilms() {
        val films = listOf(
            Film(
                title = "Spirited Away",
                description = "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.",
                poster = "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                time = "125 min",
                trailer = "https://youtu.be/ByXuk9QqQkk",
                imdb = 86,
                year = 2001,
                price = 12.99,
                genre = arrayListOf("Anime", "Fairy Tale", "Adventure", "Fantasy", "Family"),
                casts = arrayListOf(Cast(actor = "Daveigh Chase, "), Cast(actor = "Suzanne Pleshette, ") , Cast(actor = "Miyu Irino"))
            ),
            Film(
                title = "404 Sukeenirun... Run Run",
                description = "Nakrob, a young real estate swindler, discovers an abandoned hillside hotel by the beach. Seeing an opportunity, he decides to turn it into a luxury hotel scam.",
                poster = "https://m.media-amazon.com/images/M/MV5BZjRmNGFiZmMtYzRhNS00ZTE5LWE0YzktM2JmNDM3YzIwNDFiXkEyXkFqcGc@._V1_.jpg",
                time = "104 min",
                trailer = "https://youtu.be/Iu_tk3Cv8xM",
                imdb = 60,
                year = 2024,
                price = 15.99,
                genre = arrayListOf("Comedy", "Horror"),
                casts = arrayListOf(Cast(actor = "Chantavit Dhanasevi, "), Cast(actor = "Kanyawee Songmuang, "), Cast(actor = "Pittaya Saechua"))
            ),
            Film(
                title = "Howl's Moving Castle",
                description = "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
                poster = "https://m.media-amazon.com/images/M/MV5BNzlhNzlmZjktMTkyNC00ODBkLTlkZjctODAyMGRiYzQyMThmXkEyXkFqcGc@._V1_.jpg",
                time = "120 min",
                trailer = "https://youtu.be/iwROgK94zcM",
                imdb = 82,
                year = 2004,
                price = 12.99,
                genre = arrayListOf("Anime", "Fairy Tale", "Adventure", "Fantasy", "Family"),
                casts = arrayListOf(Cast(actor = "Tatsuya Gashûin, "), Cast(actor = "Takuya Kimura, "), Cast(actor = "Chieko Baishô"))
            ),
            Film(
                title = "Sonic the Hedgehog 3",
                description = "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched, Team Sonic must seek out an unlikely alliance.",
                poster = "https://m.media-amazon.com/images/M/MV5BMjZjNjE5NDEtOWJjYS00Mjk2LWI1ZDYtOWI1ZWI3MzRjM2UzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                time = "110 min",
                trailer = "https://youtu.be/qSu6i2iFMO0",
                imdb = 72,
                year = 2024,
                price = 15.99,
                genre = arrayListOf("Adventure", "Superhero", "Action", "Comedy", "Sci-Fi"),
                casts = arrayListOf(Cast(actor = "Jim Carrey, "), Cast(actor = "Ben Schwarts"), Cast(actor = "Keanu Reeves"))
            ),
            Film(
                title = "Mufasa: The Lion King",
                description = "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.",
                poster = "https://m.media-amazon.com/images/M/MV5BYjBkOWUwODYtYWI3YS00N2I0LWEyYTktOTJjM2YzOTc3ZDNlXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
                time = "118 min",
                trailer = "https://youtu.be/o17MF9vnabg",
                imdb = 67,
                year = 1994,
                price = 18.99,
                genre = arrayListOf("Drama", "Adenture", "Family"),
                casts = arrayListOf(Cast(actor = "Tiffany Boone, "), Cast(actor = "Kelvin Harrison Jr., "), Cast(actor = "Aaron Pierre"))
            ),
            Film(
                title = "Moana 2",
                description = "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
                poster = "https://m.media-amazon.com/images/M/MV5BZDUxNThhYTUtYjgxNy00MGQ4LTgzOTEtZjg1YTU5NTcwNThlXkEyXkFqcGc@._V1_.jpg",
                time = "100 min",
                trailer = "https://youtu.be/hDZ7y8RP5HE",
                imdb = 70,
                year = 2024,
                price = 18.99,
                genre = arrayListOf("Animation", "Comedy", "Family", "Fantasy"),
                casts = arrayListOf(Cast(actor = "Hualalai Chung, "), Cast(actor = "Dwayne Johnson, "), Cast(actor = "Aaron Pierre"))
            ),
            Film(
                title = "Death Whisperer 2",
                description = "In a world shrouded by darkness, a relentless force seeks retribution, undeterred by boundaries or morality",
                poster = "https://m.media-amazon.com/images/M/MV5BYmQzMjI0YTMtNmE3OC00MTk0LWE0ODAtY2ZmNzg5M2NkMDQxXkEyXkFqcGc@._V1_.jpg",
                time = "110 min",
                trailer = "https://youtu.be/1vnk75Ztiog",
                imdb = 71,
                year = 2024,
                price = 15.99,
                genre = arrayListOf("Action", "Horror", "Thriller"),
                casts = arrayListOf(Cast(actor = "Peerakrit Chacharaboonyakiat, "), Cast(actor = "Dwayne Johnson, "), Cast(actor = "Kajbhunditt Jaidee."))
            ),
            Film(
                title = "Kraven the Hunter",
                description = "Kraven's complex relationship with his ruthless father, Nikolai Kravinoff, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
                poster = "https://m.media-amazon.com/images/M/MV5BYzAzZmRjYjctYzMzYy00NzMzLWFmMTUtNDE5MTg5MGEyNzcyXkEyXkFqcGc@._V1_.jpg",
                time = "110 min",
                trailer = "https://youtu.be/I8gFw4-2RBM",
                imdb = 54,
                year = 2024,
                price = 15.99,
                genre = arrayListOf("Superhero", "Action", "Thriller"),
                casts = arrayListOf(Cast(actor = "Aaron Taylor-Johnson, "), Cast(actor = "Ariana DeBose, "), Cast(actor = "Fred Hechinger."))
            ),
            Film(
                title = "Wicked",
                description = "Elphaba, a misunderstood young woman because of her green skin, and Galinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.",
                poster = "https://m.media-amazon.com/images/M/MV5BMzE0NjU1NjctNTY5Mi00OGE2LWJkYjktZDI0MTNjN2RhNDMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                time = "160 min",
                trailer = "https://youtu.be/6COmYeLsz4c",
                imdb = 78,
                year = 2024,
                price = 18.99,
                genre = arrayListOf("Fantasy", "Romance", "Fairy Tale", "Pop Musical"),
                casts = arrayListOf(Cast(actor = "Jeff Goldblum, "), Cast(actor = "Ariana Grande, "), Cast(actor = "Cynthia Erivo."))
            ),
            Film(
                title = "Transformers One",
                description = "The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but who once were friends bonded like brothers who changed the fate of Cybertron forever.",
                poster = "https://m.media-amazon.com/images/M/MV5BZTJmMDA2MmEtODMxNS00ZjhhLTlkNWMtN2NkODI4ODU5ZWYzXkEyXkFqcGc@._V1_.jpg",
                time = "104 min",
                trailer = "https://youtu.be/jaVcDaozGgc",
                imdb = 76,
                year = 2024,
                price = 12.99,
                genre = arrayListOf("Action", "Fantasy", "Sci-Fi", "Animation", "Family"),
                casts = arrayListOf(Cast(actor = "Scarlett Johansson, "), Cast(actor = "Brian Tyree Henry, "), Cast(actor = "Chris Hemsworth."))
            )
        )

        films.forEach { film ->
            if (!dbHelper.doesFilmExist(film.title)) {
                dbHelper.insertFilm(film)
            }
        }
    }

    fun insertUpcomingMovies() {
        val upcomingMovies = listOf(
            Film(
                title = "Captain America: Brave New World",
                description = "Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan.",
                poster = "https://m.media-amazon.com/images/M/MV5BZDBlZTAzYzYtYjczZS00MmQyLTlkYjMtNzY2MzU3YjRjYTJiXkEyXkFqcGc@._V1_.jpg"
            ),
            Film(
                title = "Den of Thieves 2",
                description = "Big Nick is back on the hunt in Europe and closing in on Donnie, who is embroiled in the treacherous world of diamond thieves and the infamous Panther mafia, as they plot a massive heist of the world's largest diamond exchange.",
                poster = "https://m.media-amazon.com/images/M/MV5BZGIyYTI5N2QtZmQ5ZC00NDE4LThhYWMtNGE5NjI1OGU2M2NjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
            )
        )
        upcomingMovies.forEach { movie ->
            if (!dbHelper.doesUpcomingFilmExist(movie.title)) {
                dbHelper.insertUpcomingMovie(movie)
            }
        }
    }


    fun getUserByEmail(email: String): User? {
        return dbHelper.getUserByEmail(email)
    }

    fun getAllFilms(): List<Film> {
        return dbHelper.getAllFilms()
    }

    fun getUpcomingMovies(): List<Film> {
        return dbHelper.getUpcomingMovies()
    }

    fun closeDatabase() {
        dbHelper.close()
    }
}
