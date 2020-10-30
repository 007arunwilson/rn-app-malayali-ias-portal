Malayali IAS Portal RN App
React Native application started with `react-native-cli`

### Required env files (.env)
```
GOOGLE_WEB_CLIENT_ID=String
FACEBOOK_APP_ID=String
FB_LOGIN_PROTOCOL_SCHEME=String
API_ORIGIN=String ( URL )
RAZOR_PAYMENT_CURRENCY=String ( Currency: INR, USD etc  )
RAZOR_API_KEY=String
RAZOR_PRODUCT_LOGO_URL=String ( Logo URL )
INSTITUTE_NAME=String
INSTITUTE_BRANCH=String
```

# App flow

At app launch need to put the auth tokens in global vars, this is done throw below launch flow, 
so all follow api calls must only can done after this process is `Launch flow`.

## `Launch flow`
At app launch will check a refresh token is there, will call reseresh session and 
 on success will store the tokens in global vars and in peristant storage.
 on failure Navigate to on boarding screen


# App Structure ( MVC )
App need to strictly follow MVC pattern when 
Model is relay on data which consisting of API and Redux.
View is relay on React Views
Controller is relay on actions ('store/actions')

This way can seperate app logic from the view