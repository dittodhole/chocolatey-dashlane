![](assets/icon256.png)

# chocolatey-dashlane

> Never forget another password  
> Never misplaced. Never forgotten. Dashlane securely remembers all of your passwords.

## Installing

### [myget.org][1]

[![](https://img.shields.io/appveyor/ci/dittodhole/chocolatey-dashlane/develop.svg)][2]
[![](https://img.shields.io/myget/dittodhole/vpre/dashlane.svg)][1]

```cmd
choco install dashlane --pre --source https://www.myget.org/F/dittodhole/api/v2
```

### [chocolatey.org][3]

[![](https://img.shields.io/appveyor/ci/dittodhole/chocolatey-dashlane/master.svg)][4]
[![](https://img.shields.io/chocolatey/v/dashlane.svg)][3]

```cmd
choco install dashlane
```

## Developing & Building

```cmd
> git clone https://github.com/dittodhole/chocolatey-dashlane.git
> cd chocolatey-dashlane/
chocolatey-dashlane> cd build
chocolatey-dashlane/build> npm install
chocolatey-dashlane/build> npm run-script build
```

This will create `chocolatey-dashlane/artifacts/dashlane.{version}.nupkg`.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/14026600?v=4" width="100px;"/><br /><sub><b>bcurran3</b></sub>](https://github.com/bcurran3)<br />[🤔](#ideas-bcurran3 "Ideas, Planning, & Feedback") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

chocolatey-dashlane is published under [WTFNMFPLv3](https://github.com/dittodhole/WTFNMFPLv3).

[1]: https://www.myget.org/feed/dittodhole/package/nuget/dashlane
[2]: https://ci.appveyor.com/project/dittodhole/chocolatey-dashlane/branch/develop
[3]: https://chocolatey.org/packages/dashlane
[4]: https://ci.appveyor.com/project/dittodhole/chocolatey-dashlane/branch/master