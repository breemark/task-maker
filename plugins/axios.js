export default function ({ $axios, store }) {
    $axios.onError(err => {
        console.error(err.message)
    });

    $axios.onRequest(() => {
        console.log('test');
    })
}