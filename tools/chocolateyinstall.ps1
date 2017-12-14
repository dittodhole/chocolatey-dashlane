$packageName = 'dashlane'
$installerType = 'exe'
$silentArgs = '/SD'
$url = 'https://d3qm0vl2sdkrc.cloudfront.net/releases/5.1.0/5.1.0.11228/release/DashlaneInst.exe'
$checksum = 'c114292c35faacf6acefe7543b8272ca76d0c038'
$checksumType = 'sha1'
$validExitCodes = @(0,1223)

Install-ChocolateyPackage -PackageName "$packageName" `
                          -FileType "$installerType" `
                          -SilentArgs "$silentArgs" `
                          -Url "$url" `
                          -ValidExitCodes $validExitCodes `
                          -Checksum "$checksum" `
                          -ChecksumType "$checksumType"

Start-Sleep -Seconds 20

Get-Process -Name "Dashlane*" | foreach {
  Write-Host "Stopping $($_.ProcessName) process ($($_.Id)) ..."
  Stop-Process $_
}