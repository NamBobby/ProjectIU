plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)

    alias(libs.plugins.google.gms.google.services)
//    id("com.android.application")
//    id("com.google.gms.google-services")
}

android {
    namespace = "com.flickfanatic.bookingfilms"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.flickfanatic.bookingfilms"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

          }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-script-runtime:1.9.0")
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.constraintlayout)
    implementation(libs.androidx.navigation.fragment.ktx)
    implementation(libs.androidx.navigation.ui.ktx)

    implementation("org.mindrot:jbcrypt:0.4")





    implementation ("com.github.bumptech.glide:glide:4.12.0")
    implementation ("com.github.ismaeldivita:chip-navigation-bar:1.4.0")
    implementation ("com.github.Dimezis:BlurView:version-2.0.3")
    implementation(libs.androidx.activity)

    // JUnit
    testImplementation("junit:junit:4.13.2")
    testImplementation("androidx.arch.core:core-testing:2.1.0")
    testImplementation(libs.ext.junit)

    // Espresso
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation("androidx.test.espresso:espresso-contrib:3.5.1")

    // AndroidX Test
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test:rules:1.5.0")
    androidTestImplementation("androidx.test:core:1.5.0")
    androidTestImplementation("androidx.test:runner:1.6.2")

    // Lifecycle testing for ViewModels
    testImplementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.1")

    // Coroutines for testing
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")









}