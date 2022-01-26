const fs = require("fs");
const nft = require("./outputJson/nftMap.json");

const NFT = nft;
const dir = __dirname;

const size = 2743
const uriPrefix = "https://gateway.pinata.cloud/ipfs/QmToQ9inLkWsDLkrS7KK1iWyupN1F589kiioW9hEL9zdeB/";
const uriSuffix = ".png";

const genMeta = () => {
	for(let idx = 1; idx<= size; idx++ ) {
		const name = NFT[idx];
		console.log("Added : ", name);
		let meta = {
			name,
			token_id: idx,
			description: `Photo of ${name}.`,
			image: `${uriPrefix}${idx}${uriSuffix}`,
			attributes: [
				{ rarity: 1 }
			]
		};
		fs.writeFileSync(`./outputJson/${idx}.json`,JSON.stringify(meta));
	}
}

genMeta();
