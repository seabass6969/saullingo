export function IPA(strings: string){
    return strings.replaceAll('<ipa>', `<span style="font-family: 'Carlito', sans-serif; font-weight: 700">`).replaceAll('</ipa>', "</span>")
}