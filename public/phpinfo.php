<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js"></script>
<script type="text/javascript">
    function CalculateSig(stringToSign, privateKey){
        //calculate the signature needed for authentication
        var hash = CryptoJS.HmacSHA1(stringToSign, privateKey);
        var base64 = hash.toString(CryptoJS.enc.Base64);
        return encodeURIComponent(base64);
    }

    //set variables
    var d = new Date;
    var expiration = 3600; // 1 hour,
    var unixtime = parseInt(d.getTime() / 1000);
    var future_unixtime = unixtime + expiration;
    var publicKey = "your_public_key";
    var privateKey = "your_private_key";
    var method = "GET";
    var route = "entries/1";

    stringToSign = publicKey + ":" + method + ":" + route + ":" + future_unixtime;
    sig = CalculateSig(stringToSign, privateKey);
    var url = 'http://test14.quazar.co.za/gravityformsapi/' + route + '?api_key=' + publicKey + '&signature=' + sig + '&expires=' + future_unixtime;

    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function( response ) {
            console.log( response ); // server response
        },
        error:function(response){
            console.log( response ); // server response
        }
    });
//    $.get(url, function(data, textStatus)
//    {
//        //get the data from the api
//        if ( data.status != 200 || ( typeof( data ) != 'object' ) ) {
//            //http request failed
//            document.write( 'There was an error attempting to access the API - ' + data.status + ': ' + data.response );
//            return;
//        }
//        response    = data.response;
//        console.log(response['id']);
//    });
</script>