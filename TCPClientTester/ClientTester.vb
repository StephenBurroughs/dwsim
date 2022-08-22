Imports System.Net
Imports System.IO
Imports System.Net.Sockets
Imports System.Text
Imports System.FileIO
Module ClientTester
    Dim bytes(1023) As Byte
    Public Sub Main()
        Connect("127.0.0.1")
    End Sub
    Sub Connect(Server As [String])
        Try
            ' Create a TcpClient.
            ' Note, for this client to work you need to have a TcpServer 
            ' connected to the same address as specified by the server, port
            ' combination.
            Dim bytesWritten As Int32 = 0
            Dim i As Int32 = 0
            Dim port As Int32 = 13000
            Dim client As New TcpClient(Server, port)
            'Dim data As [Byte]() = My.Computer.FileSystem.ReadAllBytes("testFile.dwxml")
            Dim data As [Byte]() = My.Computer.FileSystem.ReadAllBytes("CavettsProblem.dwxml")

            ' Translate the passed message into ASCII and store it as a Byte array.
            'Dim data As [Byte]() = System.Text.Encoding.ASCII.GetBytes(fileByte)
            Dim stringData As String = System.Text.Encoding.UTF8.GetString(data)
            ' Get a client stream for reading and writing.

            '  Stream stream = client.GetStream();
            Dim stream As NetworkStream = client.GetStream()
            stream.Write(data, 0, data.Length)
            Console.WriteLine("Sent: {0}", System.Text.Encoding.UTF8.GetString(data))

            ' Send the message to the connected TcpServer. 
            'While bytesWritten < data.Length
            '    Dim iBytes As Byte() = BitConverter.GetBytes(i)
            '    Array.Copy(iBytes, 0, bytes, 0, iBytes.Length)
            '    Array.Copy(data, bytesWritten, bytes, 4, 1020)
            '    stream.Write(bytes, 0, bytes.Length)
            '    Console.WriteLine("Sent: {0}", System.Text.Encoding.UTF8.GetString(bytes))
            '    Console.WriteLine("iBytes size: {0}, bytes size: {1}", iBytes.Length, bytes.Length)
            '    bytesWritten += 1020
            '    i += 1
            'End While




            ' Receive the TcpServer.response.
            ' Buffer to store the response bytes.
            data = New [Byte](1024) {}

            ' String to store the response ASCII representation.
            Dim responseData As [String] = [String].Empty
            While stream.DataAvailable
                ' Read the first batch of the TcpServer response bytes.
                Dim bytes As Int32 = stream.Read(data, 0, data.Length)
                responseData = System.Text.Encoding.UTF8.GetString(data, 0, bytes)
                Console.WriteLine("Received: {0}", responseData)
            End While

            ' Close everything.
            stream.Close()
            client.Close()
        Catch e As ArgumentNullException
            Console.WriteLine("ArgumentNullException: {0}", e)
        Catch e As SocketException
            Console.WriteLine("SocketException: {0}", e)
        End Try

        Console.WriteLine(ControlChars.Cr + " Press Enter to continue...")
        Console.Read()
    End Sub

End Module
