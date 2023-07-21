<?php

use App\Models\Level;
use App\Models\StudySector;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Level::class);
            $table->foreignIdFor(StudySector::class);
            $table->string('lastname');
            $table->string('firstname');
            $table->date('birthday');
            $table->string('contact', 30)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('gender', 50);
            $table->string('matricule', 100)->unique();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
