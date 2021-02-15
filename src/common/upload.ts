import axios from "axios";
import * as imgur from '../constants/imgur.api.json';

const imgurApi = axios.create({
    baseURL: 'https://api.imgur.com/3/',
    timeout: 10000
});

export const onImageUploadClicked = (): void => {
    const input = document.getElementById('lt-img-upload');

    if (input) {
        input.click();
        input.onchange = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            if (target && target.files && target.files.length > 0) {
                const fileBlob = target.files[0];
                const formData = new FormData();
                formData.append('image', fileBlob);

                console.log(target.files[0].name);

                imgurApi.post('/upload', formData, {
                    headers: {
                        Authorization: `Client-ID ${imgur.client_id}`,
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
}