/**
 * Security package.
 *
 * <p>Contains Spring Security and JWT infrastructure:
 * <ul>
 *   <li>JwtUtil          — Token generation, validation, parsing</li>
 *   <li>JwtAuthFilter    — OncePerRequestFilter for Bearer token extraction</li>
 *   <li>UserDetailsServiceImpl — Loads admin user from Firestore</li>
 * </ul>
 */
package com.internvision.portal.security;
