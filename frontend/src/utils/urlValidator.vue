<script>
import validUrl from 'valid-url';

export default function validateUrl(url) {
    if(!validUrl.isUri(url)) {
        return {
            isValid: false,
            error: "The provided URL is not valid or is missing."
        };
    }

    if(validUrl.isHttpUri(url)) {
        return {
            isValid: false,
            error: "The provided URL must use HTTPS for security reasons."
        };
    }
    return {
        isValid: true,
        error: null
    };
}
</script>