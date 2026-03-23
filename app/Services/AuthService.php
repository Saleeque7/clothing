<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthService
{
    public function generateAndSendOtp(User $user): void
    {
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->update([
            'otp' => $otp, 
            'otp_expires_at' => now()->addMinutes(10)
        ]);
        
        // Log OTP in local dev because mail server might not be configured
        Log::info("OTP for user {$user->email}: {$otp}");
        
        // Mail::to($user->email)->send(new \App\Mail\OtpMail($otp)); 
    }

    public function verifyOtp(User $user, string $otp): bool
    {
        if ($user->otp !== $otp || now()->isAfter($user->otp_expires_at)) {
            return false;
        }
        $user->update(['is_verified' => true, 'otp' => null, 'otp_expires_at' => null]);
        return true;
    }

    public function generateReferralCode(): string
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (User::where('referral_code', $code)->exists());
        return $code;
    }
}
