# Pegipegi Web Mono-repository

This is repository for:
- www.pegipegi.com (desktop)
- www.pegipegi.com/flight (mobile)
- www.pegipegi.com/promo (desktop)

# Contributing

## Standardized tag names

- www.pegipegi.com/flight (mobile): `flight-mobile/*.*.*`
- www.pegipegi.com & www.pegipegi.com/promo (desktop): `main-desktop/*.*.*`

## Release flow

1. Create branch release with standardized names.
2. Checkout from release branch.
3. Create a PR.
4. Release the changes by using [GitHub release feature](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) with release branch as a base branch. Use the standardized names for the title and the tag. Use generated description provided by GitHub.

   > Commits that are pushed without PR will not be generated. Make sure open PR to push any commits.
   
   ![image](https://github.com/pegipegi/web-pegipegi/assets/25078249/1a14018d-8bec-45be-8f7a-7a7d73822d28)
