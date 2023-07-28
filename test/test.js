const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityPool", function () {
  let liquidityPool;
  let tokenA;
  let tokenB;
  let uniswapRouter;
  let uniswapFactory;
  let owner;
  let addr1;

  const INITIAL_SUPPLY = ethers.utils.parseEther("10000");

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy the Uniswap Router mock contract
    const UniswapRouterMock = await ethers.getContractFactory("UniswapRouterMock");
    uniswapRouter = await UniswapRouterMock.deploy();
    await uniswapRouter.deployed();

    // Deploy the Uniswap Factory mock contract
    const UniswapFactoryMock = await ethers.getContractFactory("UniswapFactoryMock");
    uniswapFactory = await UniswapFactoryMock.deploy();
    await uniswapFactory.deployed();

    // Deploy TokenA and TokenB
    const TokenA = await ethers.getContractFactory("TokenA");
    tokenA = await TokenA.deploy(INITIAL_SUPPLY);
    await tokenA.deployed();

    const TokenB = await ethers.getContractFactory("TokenB");
    tokenB = await TokenB.deploy(INITIAL_SUPPLY);
    await tokenB.deployed();

    // Deploy the LiquidityPool contract
    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
    liquidityPool = await LiquidityPool.deploy(
      uniswapRouter.address,
      uniswapFactory.address,
      tokenA.address,
      tokenB.address
    );
    await liquidityPool.deployed();
  });

  it("Should add liquidity", async function () {
    const amountADesired = ethers.utils.parseEther("100");
    const amountBDesired = ethers.utils.parseEther("200");

    await tokenA.connect(addr1).approve(liquidityPool.address, amountADesired);
    await tokenB.connect(addr1).approve(liquidityPool.address, amountBDesired);

    await expect(liquidityPool.connect(addr1).addLiquidity(amountADesired, amountBDesired))
      .to.emit(tokenA, "Transfer")
      .withArgs(addr1.address, liquidityPool.address, amountADesired)
      .to.emit(tokenB, "Transfer")
      .withArgs(addr1.address, liquidityPool.address, amountBDesired);

    // Check if LP tokens were transferred to the sender
    const pairAddress = await uniswapFactory.getPair(tokenA.address, tokenB.address);
    const balanceLP = await ethers.provider.getBalance(pairAddress);
    expect(balanceLP).to.be.above(0);
  });

  it("Should remove liquidity", async function () {
    const amountADesired = ethers.utils.parseEther("100");
    const amountBDesired = ethers.utils.parseEther("200");

    await tokenA.connect(addr1).approve(liquidityPool.address, amountADesired);
    await tokenB.connect(addr1).approve(liquidityPool.address, amountBDesired);

    await liquidityPool.connect(addr1).addLiquidity(amountADesired, amountBDesired);

    const pairAddress = await uniswapFactory.getPair(tokenA.address, tokenB.address);
    const balanceLPBefore = await ethers.provider.getBalance(pairAddress);

    await expect(liquidityPool.connect(addr1).removeLiquidity(balanceLPBefore))
      .to.emit(tokenA, "Transfer")
      .withArgs(liquidityPool.address, addr1.address, amountADesired)
      .to.emit(tokenB, "Transfer")
      .withArgs(liquidityPool.address, addr1.address, amountBDesired);

    // Check if LP tokens were burned
    const balanceLPAfter = await ethers.provider.getBalance(pairAddress);
    expect(balanceLPAfter).to.equal(0);
  });
});
