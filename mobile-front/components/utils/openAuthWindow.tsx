/**
 * @param {string} url
 * @param {string} name
 * 
 * @returns {any} data of the window
 */

export default function openAuthWindow(url: string, name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const strWindowFeatures: string = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
        const windowObjectReference: Window | null = window.open(url, name, strWindowFeatures);

        if (windowObjectReference === null) {
            reject(new Error('Failed to open window'));
        }

        window.addEventListener('message', (event: any) => {
            if (event.source !== windowObjectReference) {
                return;
            }
            windowObjectReference!.close();
            resolve(event.data);
        }, false);
    });
}