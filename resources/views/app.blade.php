<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Rec Std') }}</title>
        
        <link rel="stylesheet" href="{{ asset('assets/libs/animate/animate.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/metroui/css/metro-all.min.css') }}">
        
        <!-- Scripts -->
        <script src="{{ asset('assets/libs/jquery-3.6.js') }}"></script>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    
        <script defer src="{{ asset('assets/plugins/metroui/js/metro.min.js') }}"></script>
        <script defer src="{{ asset('assets/plugins/chart.js/chart.min.js') }}"></script>
        <script defer src="{{ asset('assets/js/index.js') }}"></script>
        <script defer src="{{ asset('assets/js/app.js') }}"></script>
    </body>
</html>
