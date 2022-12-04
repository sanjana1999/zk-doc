# zkDoc

Access all your medical records by just your Phone Number.  
An elegant solution to healthcare and hospital backend systems which brings in
Access, Security & Ease to ALL patients.  
We don't even need a wallet address to make an account, just your phone number!  
All Content Identifiers of All files are obviously encrypted!  
Your entire patient history, accessible to you, whenever you login.  
By making every visit to the Doc an NFT, we can establish clear ownership.

## Authors

- [@Richa Tiwari](https://www.github.com/richatiwari9)
- [@Rishikesh Panda](https://www.github.com/redrodeo03)
- [@Gaurang Gupta](https://www.github.com/Prat-The-Brat)
- [@Pratham Bhonge](https://www.github.com/gaurang2200)
- [@Sanjana Kumari](https://www.github.com/sanjana1999)

<figure class="video_container">
  <iframe src="https://www.youtube.com/watch?v=8rzxw4vCtqY" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Usage of web.storage (IPFS/Filecoin bounty)

```javascript
export async function storeFile({ file }) {
  console.log(file[0]);
  try {
    const web3Client = makeStorageClient();
    const cid = await web3Client.put(file);
    console.log('stored files with cid:', cid);
    return cid;
  } catch (err) {
    console.log(err);
  }
}
```

```javascript
export async function retrieve({ cid }) {
	console.log(cid);
	const web3Client = makeStorageClient();
	const res = await web3Client.get(cid);

	if (!res.ok) {
		throw new Error(`failed to get ${cid}`);
	}
	const files = await res.files();
	return files[0];
	// request succeeded!
```

## Polygon Testnet

Contract Address: 0x2e0dfe3d3b06113b1349497e3a8151c88c560ab2
