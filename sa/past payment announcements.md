Assume that the api response has been handled and there is a single output called CustomerProfile
Returned payments are organised into 3 time periods: latest Payment(s), past payments, future payments.
Payments are organised in chronological order to be played closest to the current date either back or forward.

Past payment sample

If there is only 1 payment:

"I can tell you about your last payment"
then
"For the date of..."
then
(play the Date in that record as 25th of January, 2026)
then
"a payment of..."
then
(play the name of the payment-type based on a code provided. Only the code is provided, the different payments names have to be listed) 
(this is a section I was thinking would be switch and case?)
then
(if the type === a normal payment; there is different messaging for catchup or advanced or special types)
".. was paid."
then
some silence
then
"The amount was..."
then
Amount from that record in xx dollars and yy cents

*************************
If there is more than 1 payment on the same date:

"I can tell you about your past payments"
then
"starting with the latest " (This should only play for the first)
then
"For the date of..."
then
(play the Date in that record)
then
"a payment of..."
then
(play the name of the payment-type based on a code provided. Only the code is provided, the different payments names have to be listed) 
(this is a section I was thinking would be switch and case?)
then
(if the type
".. was paid."
then
some silence
then
"The amount was..."
then
Amount from that record  in xx dollars and yy cents

THE NEXT PAYMENT ON THAT DATE

"Also, on the same date"
then
"a payment of..."
then
(play the name of the payment-type based on a code provided. Only the code is provided, the different payments names have to be listed) 
(this is a section I was thinking would be switch and case?)
then
(if the type
".. was MADE."
then
some silence
then
"The amount was..."
then
Amount from that record  in xx dollars and yy cents

THE 2ND/3rd /not last PAYMENT ON THAT DATE

"And also, on that date..."
then
as above

LAST PAYMENT
"And finally for the date of..."
play date
then
as above but paid not made.
